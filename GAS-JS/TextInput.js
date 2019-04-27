//Emulate Class TextInput for base Class Widget for CacheService service;
class TextInput extends Widget {
	constructor() {
		super();
		this.className = 'TextInput';
		this.fieldName = '';
		this.hint;
		this.multiline;
		this.action;
		//this.suggestions;
		//this.suggestionsAction;
		this.title;
		this.value;
	}
}
//add new methods to the class;
TextInput.prototype.setFieldName = function (fieldName) {
	this.fieldName = fieldName;
	return this;
};
TextInput.prototype.setHint = function (hint) {
	this.hint = hint;
	return this;
}
TextInput.prototype.setMultiline = function (multiline) {
	this.multiline = multiline;
	return this;
}
TextInput.prototype.setOnChangeAction = function (action) {
	this.action = JSON.stringify(action);
	return this;
}
TextInput.prototype.setTitle = function (title) {
	this.title = title;
	return this;
}
TextInput.prototype.setValue = function (value) {
	this.value = value;
	return this;
};
TextInput.prototype.appendToUi = function (parent) {
	const fieldName = this.fieldName;
	const action    = this.action;
	const value     = this.value;
	const multiline = this.multiline;
	const title     = this.title;
	const hint      = this.hint;

	const widget = document.createElement('div');
	widget.className = 'row '+this.className;
	parent.append(widget);
	
	const row = document.createElement('div');
	row.className = 'column';
	widget.append(row);
	
	//append title text if provided;
	if(title) {	
		const topLabel = document.createElement('label');
		topLabel.className = 'ms-fontSize-s TextInputTopLabel';
		topLabel.textContent = title;
		row.append(topLabel);
	}
	
	const inputWrap = document.createElement('div');
	inputWrap.className = 'ms-TextField ms-TextField--underlined';
	row.append(inputWrap);
	
	const label = document.createElement('label');
	label.className = 'ms-Label TextInputLabel';
	inputWrap.append(label);

	//create input element (via input or textarea);
	let input;
	if(multiline) {
		input = document.createElement('textarea');
	}else {
		input = document.createElement('input');
		input.type = 'text';
	}
	
	input.className = 'ms-TextField-field TextInputInput';
	input.value     = value;
	input.name      = fieldName;
	
	input.addEventListener('keypress',function(e){ 	
		if(e.charCode===13) { 
			e.preventDefault(); 
			this.value += '\r';
		}
	});
	
	//set optional parameters to input;
	if(action) {
		//parse action if found;
		action = JSON.parse(action);
		
		//change cursor to pointer on hover;
		widget.classList.add('pointer');
		
		//get unique identifier;
		let id = getId();
		
		//set stringifyed action to global storage;
		e_actions[id] = JSON.stringify(action);
		
		//add action reference to widget;
		widget.setAttribute('action',id);
		
		//set event listener to widget;
		widget.addEventListener('focusout',async function(){ await actionCallback(this); });
	}
	
	//append input to wrapper;
	inputWrap.append(input);
	
	//initiate Fabric;
	new fabric['TextField'](inputWrap);
	
	//append hint text if provided;
	if(hint) {
		const bottomLabel = document.createElement('label');
		bottomLabel.className = 'ms-fontSize-s TextInputBottomLabel';
		bottomLabel.textContent = hint;
		row.append(bottomLabel);
	}
}