walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	var classListChecker = function() { return -1; };
	if (node.classList && node.classList.indexOf) {
		classListChecker = function(classList, val) {
			return classList.indexOf.call(classList, val);
		};
	} else if (node.classList && node.classList.contains) {
		classListChecker = function(classList, val) {
			if (!classList.contains.call(classList, val)) {
				return -1;
			} else {
				return 0;
			}
		};
	}

	if (node.tagName && node.classList) {
		if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'
	    	|| classListChecker(node.classList, 'ace_editor') > -1) {
			return;
		}
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/\bDeep Learning\b/g, "Derp Learning");
	v = v.replace(/\bDeep learning\b/g, "Derp learning");
	v = v.replace(/\bdeep Learning\b/g, "derp Learning");
	v = v.replace(/\bdeep learning\b/g, "derp learning");
	
	textNode.nodeValue = v;
}


