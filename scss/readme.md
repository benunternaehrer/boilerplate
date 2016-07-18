# Scalable and maintainable CSS

**On this page you can find the concept of how we should structure CSS at Arcmedia. This concept is not finished and it will never be finished because as everything in the WWW, things can change fast. If you write CSS for Arcmedia you may find this very helpful. Or you may get in contact with a project where this concept was used. So please make sure you understand it because we want scalable and maintainable CSS on all our Projects.**

## Table of Content

1. BEM
2. CSS Namespaces
3. Sass Architecture
4. Sass Guideline

***

         
## 1: BEM

The Block, Element, Modifier methodology (commonly referred to as BEM) is a popular naming convention for classes in HTML and CSS. The three BEM Elements are:

##### Block:
* Each BEM Block is an independent reusable part of your UI
* Can contain Elements and even other Blocks
* Can contain one or more Modifiers
* Usage: Article, Navigation, Slider
* Example: .article, .button
* Naming Convention: multiple Words are separated by a dash (-)

##### Element:
* Belongs to its parent Block, only has a meaning there
* Can contain Elements and other Blocks
* Can contain one or more Modifiers
* Usage: Article Title, Navigation Element, Slider Slide
* Example: .article\__title, .button\__icon
* Naming Convention: an Element is separated by two underscores (\__)

##### Modifier:
* Belongs to a Block or Element
* Indicates a state different from the default
* Usage: different size/form/color etc. to default
* Example: .article__title–important, .button--large
* Naming Convention: a Modifier is separated by two dashes (-)

**Naming Convention:** We use this Naming Convention (double dash and double underscore) to avoid confusion with other classes. It also helps to visually indicate them faster. For a Block, Element or Modifier you can use a single dash, e.g .article__main-title (no CamelCase).

##### The main benefits of BEM CSS are:
* All Blocks are **independent** from they parent markup, so theoretically they are **reusable** (think of Buttons).
* BEM **decouples CSS from HTML** (no style declarations on HTML elements!).
* Single responsibility Principle: Blocks, Elements and Modifiers **focus on managing just one thing, themselves** (more about this here).

Besides this BEM helps a lot to manage our project's CSS and makes it more maintainable, scalable and reusable by others.

##### Important:

* We **don't nest** BEM Elements in CSS (like .block. block__element .block__other-element).
* We can use the & + the Modifier Part of the whole Modifier to place them where they belong. It still compiles unnested.
* **Avoid to nest Elements** like this: .teaser__content__footer. Instead try to apply only once two underscores followed by a meaningfull name (this way the Elements are not related to each other and can be replaced inside the Block). 

### Basic BEM Example

Here you can see an example how we write BEM in Sass.

**HTML: **

	<div class="teaser">
    	<h1 class="teaser__title teaser__title--special">Blabla</h1>
	    <p class="teaser__content">blablabla...</p>
    	<div class="teaser__footer">blablabla</div>
	</div>

**SCSS: **

	// Block component
	.teaser {}
 
	// Element that depends upon the block
	.teaser__title {
	    ...
    	// Modifier that changes the style of the block
	    &--special {
        	...
    	}
	}
 
	// Other Elements
	.teaser__content {}
	.teaser__footer {}
	
	
##### Further Informations
Please read the following articles for more detailed informations:

* BEM 101 on [css-tricks.com](https://css-tricks.com/bem-101/)
* MindBEMding – [getting your head ’round BEM syntax on csswizardry.com](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

***


## 2: CSS Namespaces

With BEM we introduced a naming convention. By adding namespaces **we take naming conventions a step further**. A naming convention tells us how classes within a component relate to one another, but a namespace will tell us exactly **how classes behave in a more global sense**. A namespace tells us exactly what a class (or suite of classes) does in non-relative terms.

The main concept of this namespaces comes from csswizardry.com. The idea is to **add a prefix to each class** to make clear in wich context the class stands. Please read the Blog-Post for more detailed informations about CSS Namespaces:

[More Transparent UI Code with Namespaces on csswizardry.com](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

### Overview Namespaces
In this structure we adjusted the namespace a little bit. In our projects we work with the following namespaces:


Prefix | Context | Description
------------ | ------------- | ------------
c- | Components  | Components are for specific pieces of UI like button, footer, article etc.
g- | Grid | Grid classes (not necessary in every project)
is-, has- | Current state | Classes with current state because of a certain condition
js- | JavaScript | For classes wich are used for JS (no style declaration on this classes). Removing this classes could break JS functionality
l- | Layout | Layout specific classes that may be used in any number of unrelated contexts to the one you can currently see it in
t- | Typography | Typographical classes
u- | Utility | Classes with a very specific role (often providing only one declaration)

[csswizardry.com](http://csswizardry.com/) adds some more Namespaces which we didn't use so fare (e.g. a Theme Namespace). If needed we can easily extend our Namespaces.


### Grid Namespaces (optional): g-
In this Namespace we obviously include everything what's part of the Grid. This does not include for example the whole Bootstrap, it just includes the structural parts of the UI (the skeleton).

**Example**

	.g-row  {}
	.g-col-xs-12c   {}
	.g-show-sm-up   {}

### Layout Namespaces: l-

With the Layout Namespace we abstract out the repetitive, shared, and purely structural aspects of a UI into reusable objects. This means that things like layout, wrappers and containers, etc. can all exist as non-cosmetic styles that handle the skeletal aspect of a lot of UI components, without ever actually looking like designed ‘things’. The Layout Namespace is actually the same as the Grid Namespace. But if we already use a 3rd party Grid and we need some more structural classes, we can use the Layout Namespace to add them on top and separate them clearly.

**Example**

	.l-white-wrapper {
    	&--no-border    {
	    }
	}

### Typography Namespaces: t- 

Other than the concept of Harry Roberts we use a separate Namespace for Typography. The idea is to handle all typography in one place and not spread them over tons of different components. This ensures that there is no redundancy and that there aren't to many font-styles.
Can be written in BEM

**Example**

	.t-h1   {}
	.t-subitel {}
	.t-copy {
	   &--bold {
	   }
	}
	
### Component Namespaces: c- 

Components are normally the most common Namespace. Components are the specific parts of the UI like button, form, slider, gallery, footer, navigation etc.

**Example**

	.c-teaser   {}
	.c-teaser__img   {}
	.c-slider   {}
	.c-nav-main {}

### Current state Namespaces: is-, has- 

State Namespaces are telling us about short-lived or temporary states of the UI that need styling accordingly. This classes are not always by default in the markup, but can be added server- or client-side.

**Example**

	.is-active  {}
	.is-loading {}
	.has-dropdown   {}

### JavaScript Namespaces: js-

With the JavaScript Namespace we can separate styling and behaviour of a block to make sure that changing a class will not break JS-functionality. 

**Example**

	.js-accordion  {}
	.js-accordion__toggler  {}
	.js-accordion__element  {}
	.js-apply-filter    {}


### Utility Namespaces: u- 

Utilities are complete single responsibility rules which have a very specific and targeted task. It is also quite common for these rules’ declarations to carry !important so as to guarantee they beat other less specific ones. They do one thing in a very heavy-handed and inelegant way. They are to be used as a last resort when no other CSS hooks are available, or to tackle completely unique circumstances, e.g. using .u-text-center to centrally align one piece of text once and once only. They are only one step away from inline styles, so should be used sparingly.
**Important**: Never ever change a a Utility class or reassign it.  

**Example**

	.u-clearfix {}
	.u-align-center {}

### Example BEM + CSS-Namespaces

Here is an HTML example how this all could work together. By just looking at the classes, you now have an idea what each class stands for, how they are related to each other and where you could and where you shouldn't make any changes. 

	<div class="g-row">
    	<div class="g-col-xs-12c">
        	<div class="l-white-wrapper u-mb-20">
            	<h2 class="t-h3">Title</h2>
	            <nav class="c-nav-sub t-copy">
    	            <ul class="c-nav-sub__w">
        	            <li class="c-nav-sub__el">
            	            <a href="/" class="c-nav-sub__link is-active">Link 1</a>
                	    </li>
		               	<li class="c-nav-sub__el">
	                        <a href="/" class="c-nav-sub__link">Link 2</a>
    	                </li>
        	            <li class="c-nav-sub__el c-nav-sub__el--special">
            	            <a href="/" class="c-nav-sub__link">Link 3</a>
                	    </li>
	                </ul>
    	        </nav>
        	    <button class="c-button c-button--large js-contact">
            	    Kontakt
	            </button>
    	    </div>
	    </div>
	</div>

***

## 3: Sass Architecture

The idea of our Sass Architecture comes again from the CSS Mastermind Harry Roberts and is called ITCSS. ITCSS stands for Inverted Triangle CSS and it provides a specific layer for each purpose.

##### The concept of ITCSS Layers is:

* Specificity slowly increases layer-by-layer
* We affect smaller and smaller bits of the DOM at a time.
* Progreeively adding styles, never undoing.

##### The goals of ITCSS are:

* Everything has a place to live.
* People know where to look to find types of rule.
* A sane source order.
* Reduce waste/redundancy.
* Increased scalability.
* The Specificity Wars are over!

This Architecture is easily scaleable. You can remove or add parts. Please check out Harry Roberts' presentation about ITCSS for further informations. 

### Architecture:


Parent Foder | File/Folder name  | Description
---------------- | ------------- | ------------
01_settings |  | Project Specific Settings. No Style declarations at this point.
| 01_colors.scss | All the colors which are used in the project.
| 02_variables.scss	| Reusable variables throughout the project.
| 03_mixins.scss | Reusable mixins throughout the project.
02_reset | | Resets everything to avoid undesired styling
| reset_basic.scss	| Basic Reset from html5doctor.
| reset_custom.scss | Some custom resets by Arcmedia (like border-box).
| reset_form.scss | Cuts out all the browser styles for buttons, inputs etc.
03_vendor | |
| grid | Mobile first Grid (just the skeleton, no other styles).
| … | Other 3rd partie vendor files (like CSS styles from jQuery-Plugins etc.).
04_global | | 
| basics.scss | Contains some basic styles like link styling or the Body background-color.
| layout.scss | Styles from the Layout Namespace.
| print.scss | Styles for the print stylesheet, contains some default styles as a starting point.
| typography.scss | Styles from the Typography Namespace. Contains some default mixins and functions.
05_components | |
| … | One file for each Component in the Component Namespace.
06_utilities | |
| utilities.scss | Styles from the Utility Namespace.
07_overwrites | | 
| overwrites.scss | Styles wich do not match any of the other namespaces. Try to keep this empty.
/ | |
| temp.scss | Is used for temporary CSS declarations such as fixes from the developers etc. This should be reviewed and moved into the correct files/components.
| main.scss | imports all the files from above. You need to add new files manually.

***

## 4: Sass Guideline 

So fare we know how to structure CSS. But it is also important that we write CSS resp. Sass the same way to keep it maintainable. To achieve this, please follow the [Sass Guidlines](http://sass-guidelin.es/) (except Architecture part).  
  


### Some rules to keep in mind:

* **Don‘t use ID‘s** at all
* Basicly **don‘t nest** at all (just nest for states like .is-active, .has-children etc.)
* **Don‘t use !important** (except on Utility classes)
* Use **mediaqueries directly at the class**
* Try to **group CSS declarations** in a way they make sense (e.g. positioning + left + top / font-family + font-size / etc.)
* **Don‘t style tags**, allways style classes
* **Don't create classes without a namespace prefix**
* Use **// for comments** in Sass and they will not end up in the compiled CSS
* Be **generous with commenting**
* If a :hover pseudo class is styled, **:focus** should also be styled for accessibility
* **sepparate style declaratins** (e.g. margin-left + margin-right instead of margin) 


***

#### Other resources:
Similar approach (though without strict BEM convention and namespacing)
[http://maintainablecss.com](http://maintainablecss.com)

**Further readings:**

[https://medium.com/@shaunbent/css-at-bbc-sport-part-1-bab546184e66#.eif3hz6vu ](https://medium.com/@shaunbent/css-at-bbc-sport-part-1-bab546184e66#.eif3hz6vu)

