import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {chromium} from 'playwright';

const output='website-test-results';
await mkdir(output,{recursive:true});
const browser=await chromium.launch();
const errors=[];
try {
  const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
  page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
  await page.goto('http://127.0.0.1:4173/.github/',{waitUntil:'networkidle'});
  await page.locator('#main').waitFor();
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'desktop horizontal overflow');
  assert.deepEqual(await page.locator('img').evaluateAll(images=>images.filter(image=>!image.complete||!image.naturalWidth).map(image=>image.src)),[],'broken images');
  assert.deepEqual(await page.locator('a[href^="#"]').evaluateAll(links=>links.map(link=>link.getAttribute('href')).filter(href=>href!=='#'&&!document.getElementById(href.slice(1)))),[],'missing section anchors');
  for(const app of ['weather','music','calculator','todo','calendar']) {
    await page.locator(`#tab-${app}`).click();
    assert.equal(await page.locator(`#tab-${app}`).getAttribute('aria-selected'),'true');
    assert.equal(await page.locator('#app-panel').getAttribute('aria-labelledby'),`tab-${app}`);
    assert.ok((await page.locator('#app-icon').getAttribute('src')).endsWith(`/${app}.svg`));
  }
  await page.locator('#tab-calendar').focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#tab-weather').getAttribute('aria-selected'),'true');
  await page.keyboard.press('End');
  assert.equal(await page.locator('#tab-todo').getAttribute('aria-selected'),'true');
  await page.keyboard.press('Home');
  await page.locator('#language').click();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.match(await page.locator('h1').innerText(),/Every day/);
  assert.ok((await page.locator('#install-link').getAttribute('href')).endsWith('GettingStarted.md'));
  await page.locator('#language').click();
  const trigger=page.locator('[data-image]').first();
  await trigger.click();
  assert.equal(await page.locator('#lightbox').evaluate(dialog=>dialog.open),true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#lightbox').evaluate(dialog=>dialog.open),false);
  assert.equal(await trigger.evaluate(element=>document.activeElement===element),true);
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${output}/desktop.png`,fullPage:true});
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,'mobile horizontal overflow');
  await page.locator('#tab-music').click();
  assert.equal(await page.locator('#tab-music').getAttribute('aria-selected'),'true');
  await page.locator('#tab-calendar').click();
  await page.evaluate(()=>scrollTo(0,0));
  await page.screenshot({path:`${output}/mobile.png`,fullPage:true});
  assert.deepEqual(errors,[],'browser errors');
  console.log('PASS: image assets, anchors, five app tabs, keyboard navigation, language switching, lightbox, reduced motion, and desktop/mobile layout');
} catch(error) {
  await writeFile(`${output}/failure.txt`,`${error.stack}\n${errors.join('\n')}`);
  throw error;
} finally {
  await browser.close();
}
