import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const output='website-test-results';
await mkdir(output,{recursive:true});
const browser=await chromium.launch();
const errors=[];
try {
  const context=await browser.newContext({
    viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce',
    locale:'en-US',permissions:['clipboard-read','clipboard-write']
  });
  const page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
  await page.goto('http://127.0.0.1:4173/.github/',{waitUntil:'networkidle'});
  await page.locator('#main').waitFor();

  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'desktop horizontal overflow');

  assert.deepEqual(await page.locator('img[src]').evaluateAll(async images=>{
    await Promise.all(images.map(image=>{image.loading='eager';return image.decode().catch(()=>{})}));
    return images.filter(image=>!image.complete||!image.naturalWidth).map(image=>image.src);
  }),[],'broken images');

  assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')).filter(href=>href!=='#'&&!document.getElementById(href.slice(1)))),[],'missing section anchors');

  // The hero carries the one real capture; every remaining slot is an empty,
  // labelled placeholder that keeps its final ratio.
  const shots=page.locator('.shot');
  assert.ok(await shots.count()>=10,'expected all screenshot slots to be present');
  assert.deepEqual(await shots.evaluateAll(nodes=>nodes.filter(node=>!node.querySelector('.shot-label')&&!node.querySelector('img')).length),0,'every screenshot slot needs a placeholder label or a real image');
  assert.ok(await page.locator('.shot-real img').count()>=1,'hero must show a real capture');

  // Anchor scroll must clear both sticky navs
  await page.locator('.sub-nav .pill[href="#compat"]').click();
  await page.waitForTimeout(900);
  const anchor=await page.evaluate(()=>{
    const section=document.getElementById('compat');
    return {
      top:section.getBoundingClientRect().top,
      navBottom:document.querySelector('.sub-nav').getBoundingClientRect().bottom
    };
  });
  assert.ok(anchor.top>=anchor.navBottom-1,`#compat must not hide under the sticky nav (top ${anchor.top}, nav ${anchor.navBottom})`);
  assert.equal(await page.locator('.compat-panel .compat-cols li').count(),6,'the compatibility panel lists five environments plus the guide link');
  assert.ok(await page.locator('#guide-link').isVisible());

  // The nav flips polarity over the light bands and back over the dark ones.
  // The probe sits just under the sub-nav, so scroll until a light section
  // clearly covers it rather than landing on a boundary.
  const bandAt=async(selector,offset)=>{
    await page.evaluate(([sel,y])=>{
      const section=document.querySelector(sel);
      scrollTo(0,section.getBoundingClientRect().top+scrollY+y);
    },[selector,offset]);
    await page.waitForTimeout(400);
    return page.evaluate(()=>({
      band:document.documentElement.dataset.band||null,
      nav:getComputedStyle(document.querySelector('.global-nav')).backgroundColor
    }));
  };
  const light=await bandAt('#apps',300);
  assert.equal(light.band,'light','the apps band must declare itself light');
  assert.match(light.nav,/^rgba\(245, 245, 247/,'the nav must become the light surface over a light band');
  const dark=await bandAt('#design',300);
  assert.equal(dark.band,null,'the design band must clear the light state');
  assert.doesNotMatch(dark.nav,/^rgba\(245, 245, 247/,'the nav must return to dark over a dark band');

  // Carousel: six tabs, click + keyboard
  const tabs=page.locator('.tab');
  assert.equal(await tabs.count(),6);
  assert.equal(await page.locator('.slide').count(),6);
  await page.locator('#tab-launcher').click();
  assert.equal(await page.locator('#stage-track').evaluate(el=>el.style.transform),'translateX(-200%)');
  assert.equal(await page.locator('#tab-launcher').getAttribute('aria-selected'),'true');
  assert.equal(await page.locator('#stage').getAttribute('aria-labelledby'),'tab-launcher');
  await page.locator('#tab-launcher').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#tab-control').getAttribute('aria-selected'),'true');
  await page.keyboard.press('Home');
  assert.equal(await page.locator('#tab-glass').getAttribute('aria-selected'),'true');
  assert.equal(await page.locator('.dot[aria-current="true"]').count(),1);

  // Pause control toggles its pressed state
  const toggle=page.locator('#stage-toggle');
  const pressed=await toggle.getAttribute('aria-pressed');
  await toggle.click();
  assert.notEqual(await toggle.getAttribute('aria-pressed'),pressed);

  // The primary UI language decides the page language, exactly as the
  // desktop does: en-US here, so English is the start-up copy.
  assert.equal(await page.locator('html').getAttribute('lang'),'en','an English system starts in English');
  assert.match(await page.locator('h1').innerText(),/Liquid Glass/);
  assert.equal(await page.locator('#tab-glass').innerText(),'Liquid Glass');
  assert.match(await page.locator('.slide h3').first().innerText(),/Running in the compositor/);
  assert.equal(await page.locator('html').getAttribute('data-lang-pending'),null,'the language gate must clear');

  // Glass lab: presets write both sliders, a manual drag clears the preset
  const sample=page.locator('#glass-sample');
  const read=()=>sample.evaluate(el=>({
    background:getComputedStyle(el).backgroundColor,
    filter:getComputedStyle(el).backdropFilter
  }));
  assert.equal(await page.locator('#glass-sample span').innerText(),'Liquid');
  await page.locator('.preset[data-preset="frosted"]').click();
  assert.equal(await page.locator('#blur').inputValue(),'100');
  assert.equal(await page.locator('#liquid').inputValue(),'28');
  assert.equal(await page.locator('.preset[data-preset="frosted"]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#glass-sample span').innerText(),'Frosted');
  const frosted=await read();
  assert.match(frosted.filter,/blur\(40px\)/,'frosted preset must raise blur');
  await page.locator('.preset[data-preset="liquid"]').click();
  const liquid=await read();
  assert.notEqual(liquid.filter,frosted.filter,'switching preset must change backdrop-filter');
  assert.equal(await page.locator('#glass-sample span').innerText(),'Liquid');
  await page.locator('#blur').fill('0');
  assert.deepEqual(await page.locator('.preset[aria-pressed="true"]').count(),0,'a manual drag leaves no preset selected');
  assert.match(await sample.evaluate(el=>getComputedStyle(el).backdropFilter),/blur\(0px\)/);

  // Copy button writes the command
  await page.locator('#copy-install').click();
  assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/kosctl update/,'copy button must put the install command on the clipboard');

  // Switching to Chinese rewrites the page and its links
  await page.locator('#language').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
  assert.match(await page.locator('h1').innerText(),/液态玻璃/);
  assert.equal(await page.locator('#tab-glass').innerText(),'液态玻璃');
  assert.match(await page.locator('.slide h3').first().innerText(),/跑在合成器里/);
  assert.equal(await page.locator('#glass-sample span').innerText(),'液态玻璃');
  assert.equal(await page.locator('.preset[data-preset="soft"]').innerText(),'柔光玻璃');
  assert.ok((await page.locator('#install-link').getAttribute('href')).endsWith('GettingStarted.zh-CN.md'));
  assert.ok((await page.locator('#guide-link').getAttribute('href')).endsWith('GettingStarted.zh-CN.md'));

  // The choice is remembered across a reload
  await page.reload({waitUntil:'networkidle'});
  assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN','an explicit choice survives a reload');
  assert.equal(await page.locator('html').getAttribute('data-lang-pending'),null);
  await page.locator('#language').click();
  assert.ok((await page.locator('#install-link').getAttribute('href')).endsWith('GettingStarted.md'));

  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${output}/desktop.png`,fullPage:true});

  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'mobile horizontal overflow');
  assert.equal(await page.evaluate(()=>getComputedStyle(document.querySelector('.stage')).borderRadius),'20px');
  assert.equal(await page.locator('.float-card').first().isVisible(),false,'hero cards must not crowd a phone');
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${output}/mobile.png`,fullPage:true});

  assert.deepEqual(errors,[],'browser errors');
  console.log('PASS: assets, anchors, screenshot placeholders, anchor offsets, six-slide carousel (tab, keyboard, dots, pause), glass presets and sliders, install copy, OS-language default with a remembered switch, and desktop/mobile layout');
} catch(error) {
  await writeFile(`${output}/failure.txt`,`${error.stack}\n${errors.join('\n')}`);
  throw error;
} finally {
  await browser.close();
}
