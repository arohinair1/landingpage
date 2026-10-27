import {projects,experience,courses,earlyCourses,personal,building} from './content.js';
import './angle-game.js';
const $=id=>document.getElementById(id);
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
const link=(text,url)=>{const a=el('a','',text);a.href=url;return a;};
const grid=el('div','project-grid');
projects.forEach((p,i)=>{if(i<2){const a=el('article','project-feature');a.append(el('p','eyebrow',p.tag),el('h3','',p.heading),el('p','',p.description),el('span','caption',p.date+' / COMPLETED'),link('Read the report',p.url));grid.append(a);}else{const row=el('article','project-row'),d=el('details'),s=el('summary','',p.displayTitle || p.title);d.append(s,el('p','formal-title',p.title),el('p','',p.description),link('Read the original report ↗',p.url));row.append(el('span','mono',String(i+1).padStart(2,'0')),d,el('span','caption',p.date+' / Completed'));$('projects').append(row);}});$('projects').prepend(grid);
experience.forEach(([date,name,role,description])=>{const row=el('article','experience-row'),main=el('div');main.append(el('h3','',name),el('p','role',role));row.append(el('span','caption',date),main,el('p','',description));$('experience-list').append(row);});
courses.forEach(([name,rows])=>{const d=el('details','course-group'),list=el('ul');d.append(el('summary','',name+' ↗'));rows.forEach(([name,code,grade])=>{const li=el('li'),label=el('span','',name);label.append(el('small','',code));li.append(label,el('span','',grade));list.append(li);});d.append(list);$('coursework').append(d);});
// Secondary education: exact MSU course names and numeric course grades.
const early = el('details', 'course-group early-coursework');
early.append(el('summary', '', 'Early University Coursework ↗'));
early.append(el('p', 'caption', 'Michigan State University · Dual enrollment during high school · 2021–2023'));
early.append(el('p', 'early-context', 'Chemistry and mathematics coursework alongside my early computational chemistry research in MSU’s Wilson Lab.'));
const earlyList = el('ul');
for (const course of earlyCourses) {
  const row = el('li');
  const label = el('span', '', course.name);
  label.append(el('small', '', course.code + ' · ' + course.term));
  const grade = el('span', '', course.grade);
  grade.setAttribute('aria-label', 'Course grade: ' + course.grade);
  row.append(label, grade);
  earlyList.append(row);
}
early.append(earlyList, el('p', 'caption', 'Individual course grades shown on MSU’s numeric scale.'));
$('coursework').append(early);


$('reading-title').textContent = personal.book.title;
$('reading-author').textContent = personal.book.author;
$('trip-title').textContent = personal.trip.title;
$('trip-caption').textContent = personal.trip.caption;
for (const photo of personal.trip.photos) {
  const image = $(photo.id);
  image.src = photo.image;
  image.alt = photo.alt;
  image.width = photo.width;
  image.height = photo.height;
}
$('product-description').textContent = building.description;
$('product-progress').textContent = building.progress;
