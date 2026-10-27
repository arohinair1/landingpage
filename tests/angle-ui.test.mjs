// Exercise the production event handlers with a minimal DOM; no test dependencies.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import * as core from '../assets/js/portfolio/angle-core.mjs';
class Element {
  constructor(){this.textContent='';this.hidden=false;this.value='';this.attrs={};this.children=[];this.listeners={};}
  setAttribute(k,v){this.attrs[k]=v;}
  removeAttribute(k){delete this.attrs[k];}
  replaceChildren(...children){this.children=children;}
  addEventListener(k,fn){assert.ok(!this.listeners[k]);this.listeners[k]=fn;}
  focus(){focused=this;}
}
const elements=new Map();let focused=null;
const document={getElementById(id){if(!elements.has(id))elements.set(id,new Element());return elements.get(id);},createElement(){return new Element();}};
let samples=[0,0];
const math=Object.create(Math);math.random=()=>{assert.ok(samples.length,'unexpected random call');return samples.shift();};
const source=readFileSync(new URL('../assets/js/portfolio/angle-game.js',import.meta.url),'utf8').replace(/^import .*?;\n/,'');
vm.runInNewContext(source,{document,Math:math,...core});
const get=id=>document.getElementById(id);
const submit=()=>get('guess-form').listeners.submit({preventDefault(){}});
for(const input of ['', '-1','0','360','abc','1.5','1e2']){
  get('guess').value=input;submit();assert.equal(get('result').hidden,true);assert.equal(focused,get('guess'));assert.ok(get('game-error').textContent);
}
let total=0,previous=1;
for(let actual=1;actual<=359;actual++){
  const guess=[1,90,180,270,359][actual%5];get('guess').value=String(guess);submit();
  const expected=core.accuracy(guess,actual);total+=expected.points;
  assert.equal(get('result').hidden,false);assert.equal(get('result').children.length,3);
  assert.equal(get('angle-label').textContent,actual+'°');
  assert.ok(get('result').children[1].textContent.includes(`${expected.error}° off · ${expected.points}/100 points`));
  assert.equal(get('session-score').textContent,`${total} points · ${actual} played`);
  submit();assert.equal(get('session-score').textContent,`${total} points · ${actual} played`,'duplicate submission must not score twice');
  if(actual<359){
    const next=actual+1;const candidate=next>=previous?next-1:next;
    samples=[(candidate-.5)/358,(actual%360)/360];get('next-angle').listeners.click();previous=next;
    assert.equal(get('result').children.length,0);assert.equal(focused,get('guess'));
  }
}
assert.equal([...elements.values()].reduce((n,e)=>n+Object.keys(e.listeners).length,0),2,'listeners must not accumulate across rounds');
assert.ok(elements.size<30,'DOM node registry must remain bounded');
console.log('Arc UI passed: every answer 1–359, validation, reveals, cumulative scoring, duplicate-submit protection, focus, replay, bounded DOM/listeners.');
