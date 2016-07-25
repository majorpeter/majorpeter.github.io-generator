#!/usr/bin/env python3
from _datetime import datetime
import sys
import html

if sys.argv.__len__() < 3:
    print('Missing arguments!\n'
          '\n'
          'Usage: ' + sys.argv[0] + ' <build-target> <output-file>\n')
    exit(1)

try:
    from jinja2 import Environment, PackageLoader
except ImportError:
    print('jinja2 is required to run!\n'
          '\n'
          'Install via pip:\n'
          '     pip install jinja2\n')
    exit(1)

env = Environment(loader=PackageLoader('sitegen', 'template'))
template = env.get_template('index.html')

url_index_hu = 'index.html'
url_index_en = 'index_en.html'
language = None

target = sys.argv[1]
if target in ['cv_hu']:
    language = 'hu'
elif target in ['cv_en']:
    language = 'en'

if language == 'hu':
    cv_src = 'export/cv_hu_embed.html'
elif language == 'en':
    cv_src = 'export/cv_en_embed.html'

with open(cv_src, 'r') as html_file:
    cv_content = html_file.read()

if language == 'hu':
    locale = {
        'curriculum_vitae': 'Önéletrajz',
        'printable_version': 'Nyomtatható verzió',
        'download_as_xml': 'Letöltés XML-ként',
        'in_english': 'Angol nyelven (in English)',
        'in_hungarian': 'Magyar nyelven (in Hungarian)',
        'back_to_top': 'Vissza a tetejére',
        'link_to_this_section': 'Hivatkozás erre a bekezdésre'
    }
elif language == 'en':
    locale = {
        'curriculum_vitae': 'Curriculum Vitae',
        'printable_version': 'Printable version',
        'download_as_xml': 'Download as XML',
        'in_english': 'In English (angol nyelven)',
        'in_hungarian': 'In Hungarian (magyar nyelven)',
        'back_to_top': 'Back to the top',
        'link_to_this_section': 'Link to this section'
    }

actions = [
        {
            'title': locale['printable_version'],
            'image': 'img/print.png',
            'url': 'cv_%s.html' % language
        }, {
            'title': locale['download_as_xml'],
            'image': 'img/xml-ico.png',
            'url': 'cv/cv.xml'
        }
    ]
if language == 'hu':
    actions.append({
        'title': locale['in_english'],
        'image': 'img/lng_en.png',
        'url': url_index_en
    })
elif language == 'en':
    actions.append({
        'title': locale['in_hungarian'],
        'image': 'img/lng_hu.png',
        'url': url_index_hu
    })

cv_content = cv_content.\
    replace('<h1>', '<h1 class="cvtitle">').\
    replace('<a class="anchor"', '<a class="anchor" title="' + html.escape(locale['link_to_this_section']) + '"')

values = {
    'page_title': 'Major Péter',
    'head_keywords': 'Major Péter, villamosmérnök, electrical engineer, BME, műszaki egyetem, műegyetem',
    'head_desc': 'Major Péter személyes oldala.',
    'logo_title': 'Major Péter',
    'navigation': [
        {
            'title': locale['curriculum_vitae'],
            'url': '#'
        }, {
            'title': 'GitHub/majorpeter',
            'url': 'https://github.com/majorpeter'
        }
    ],
    'content': '<h1 class="left">' + locale['curriculum_vitae'] + '</h1>' + cv_content,
    'actions': actions,
    'copyright_notice': '&copy; Copyright ' + datetime.now().strftime('%Y') + ' Major Péter'
}

values.update(locale)

render = template.render(values)
outfile = open(sys.argv[2], 'w')
outfile.write(render)
