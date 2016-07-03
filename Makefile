FETCH_REPO := git clone --depth=1
CV := git@github.com:majorpeter/cv.git
CV_DIR := cv
XML := $(CV_DIR)/cv.xml

CVC := git@github.com:majorpeter/cv-compiler.git
CVC_DIR := compiler
COMPILER := $(CVC_DIR)/cvc.py
COMPILER_HTML_FLAGS := --image-path=cv/ --css=css/cv.css

EXPORT := export
GENPAGES := ./genpages.py

RES_SRC := $(wildcard resource/**/*) $(wildcard resource/*.*)
RSRC := $(patsubst resource/%,$(EXPORT)/%,$(RES_SRC))

CV_SRC := $(wildcard $(CV_DIR)/*)
CV_EXPORT := $(patsubst $(CV_DIR)/%,$(EXPORT)/cv/%, $(CV_SRC))

all: $(RSRC) $(CV_EXPORT) $(EXPORT)/index.html $(EXPORT)/index_en.html $(EXPORT)/cv_hu.html $(EXPORT)/cv_en.html $(EXPORT)/cv_hu_embed.html $(EXPORT)/cv_en_embed.html

clean:
	rm -Rf $(EXPORT)
	
ifeq ($(shell cd $(CV_DIR) 2> /dev/null ; git diff),)
	rm -Rf $(CV_DIR)
else
	@echo '$(CV_DIR) has uncommited changes.'
endif

ifeq ($(shell cd $(CVC_DIR) 2> /dev/null ; git diff),)
		rm -Rf $(CVC_DIR)
else
		@echo '$(CVC_DIR) has uncommited changes.'
endif

$(XML):
	$(FETCH_REPO) $(CV) $(CV_DIR)

$(COMPILER):
	$(FETCH_REPO) $(CVC) $(CVC_DIR)

$(EXPORT): $(XML) $(COMPILER)
	mkdir -p $(EXPORT)

$(EXPORT)/index.html: $(GENPAGES) $(EXPORT)/cv_hu_embed.html
	$(GENPAGES) cv_hu export/index.html

$(EXPORT)/index_en.html: $(GENPAGES) $(EXPORT)/cv_en_embed.html
	$(GENPAGES) cv_en export/index_en.html

$(EXPORT)/cv_hu.html: $(EXPORT) $(XML)
	$(COMPILER) $(XML) $@ $(COMPILER_HTML_FLAGS) --language=hu

$(EXPORT)/cv_en.html: $(EXPORT) $(XML)
	$(COMPILER) $(XML) $@ $(COMPILER_HTML_FLAGS) --language=en

$(EXPORT)/cv_hu_embed.html: $(EXPORT) $(XML)
	$(COMPILER) $(XML) $@ $(COMPILER_HTML_FLAGS) --format=html-headless --language=hu

$(EXPORT)/cv_en_embed.html: $(EXPORT) $(XML)
	$(COMPILER) $(XML) $@ $(COMPILER_HTML_FLAGS) --format=html-headless --language=en

$(EXPORT)/cv/%: cv/%
	mkdir -p `dirname $@`
	cp $< $@

$(RSRC):
	mkdir -p `dirname $@`
	cp $(patsubst export/%,resource/%,$(@)) $@

