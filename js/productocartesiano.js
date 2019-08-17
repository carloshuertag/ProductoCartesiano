function addElement(setIndex, elementsCount) {
    /** Valid parametes and adds an element to the current set form. */
    // Valid parameters
    if (setIndex === 0 || elementsCount === 0) {
        alert("Ha ocurrido un error al agregar más elementos");
        return false;
    }
    var elementIndex = elementsCount + 1;
    var set = document.getElementById("set" + setIndex);
    var newLabel = document.createElement("label");
    newLabel.innerHTML = "Elemento " + elementIndex;
    newLabel.for = "set" + setIndex + "element" + elementIndex;
    // label tag will be inside the form tag.
    set.appendChild(newLabel);
    var newInput = document.createElement("input");
    newInput.id = "set" + setIndex + "element" + elementIndex;
    newInput.type = "text";
    newInput.placeholder = "Elemento " + elementIndex;
    newInput.setAttribute("class", "element");
    // input tag will be inside the form tag.
    set.appendChild(newInput);
    // br tag will be inside the form tag.
    set.appendChild(document.createElement("br"));
}

function addSet(setsCount) {
    /** Valid parameters and adds a set form */
    //Valid parameters
    if (setsCount === 0) {
        alert("Ha ocurrido un error al agregar más conjuntos");
        return false;
    }
    var setIndex = setsCount + 1;
    var sets = document.getElementById("sets");
    var newSet = document.createElement("form");
    newSet.action = "";
    newSet.method = "POST";
    newSet.id = "set" + setIndex;
    sets.appendChild(newSet);
    // form tag will be inside the div tag.
    var newSetTitle = document.createElement("h3");
    newSetTitle.innerHTML = "Conjunto " + setIndex;
    newSet.appendChild(newSetTitle);
    // title tag will be inside the form tag.
    var newSetLabel = document.createElement("label");
    newSetLabel.innerHTML = "Elemento 1";
    newSetLabel.for = "set" + setIndex + "element" + 1;
    // label tag will be inside the form tag.
    newSet.appendChild(newSetLabel);
    var newSetInput = document.createElement("input");
    newSetInput.id = "set" + setIndex + "element" + 1;
    newSetInput.type = "text";
    newSetInput.placeholder = "Elemento 1";
    newSetInput.setAttribute("class", "element");
    // input tag will be inside the form tag.
    newSet.appendChild(newSetInput);
    // br tag will be inside the form tag.
    newSet.appendChild(document.createElement("br"));
    var newSetButton = document.createElement("button");
    newSetButton.innerHTML = "Añadir Elemento";
    newSetButton.id = "set" + setIndex + "addElement";
    newSetButton.type = "button";
    newSetButton.setAttribute("onclick", "addElement(" + setIndex + ", document.forms[" + setsCount + "].elements.length)");
    newSetButton.setAttribute("class", "addElement");
    // button tag will be inside the div tag.
    sets.appendChild(newSetButton);
    // br tag will be inside the div tag.
    sets.appendChild(document.createElement("br"));
    // br tag will be inside the div tag.
    sets.appendChild(document.createElement("br"));
}

function getPC() {
    /** Grant all sets' elements are filled and shows valid format PCSet by concating set's elements and the same concat with the next set.*/
    var sets = document.forms;
    for (var i = 0; i < sets.length; ++i) {
        for (var j = 0; j < sets[i].elements.length; ++j) {
            if (sets[i].elements[j].value === "") {
                alert("Llene los campos faltantes");
                sets[i].elements[j].focus();
                return false;
            }
        }
    }
    var pcLength = 1;
    var setIndex = 0;
    var pcSet = getNonRepeatedSet(sets[setIndex]);
    pcLength *= pcSet.length;
    ++setIndex;
    while (setIndex < sets.length) {
        var set = getNonRepeatedSet(sets[setIndex]);
        pcLength *= set.length;
        pcSet = pc(pcSet, set);
        ++setIndex;
    }
    // Format PC
    var pcSetFormat = new Array();
    for (var i = 0; i < pcSet.length; ++i) {
        pcSetFormat.push(("(" + pcSet[i] + ")"));
    }
    // Valid PC
    if (pcLength === pcSet.length) {
        document.getElementById("pc").innerHTML = "Producto cartesiano: {" + pcSetFormat.toString() + "}" + "<br/>" + "Cardinalidad: " + pcSet.length;
    } else {
        alert("Ha ocurrido un error al calcular el producto cartesiano");
    }

}

function getNonRepeatedSet(RepeatedSet) {
    /** @returns: nonRepeatedSet
     * Gets a set with non repeated elements from the set given.
     */
    var element;
    var nonRepeatedSet = new Array();
    for (var i = 0; i < RepeatedSet.elements.length; ++i) {
        element = RepeatedSet.elements[i].value;
        if (!nonRepeatedSet.includes(element)) {
            nonRepeatedSet.push(element);
        }
    }
    return nonRepeatedSet;
}

function pc(set1, set2) {
    /** @returns: pcSet
     * Concats set1 elements with set2 elements.
     */
    var pcSet = new Array();
    for (var i = 0; i < set1.length; ++i) {
        for (var j = 0; j < set2.length; ++j) {
            var pcElement = (set1[i] + ", " + set2[j]);
            pcSet.push(pcElement);
        }
    }
    return pcSet;
}