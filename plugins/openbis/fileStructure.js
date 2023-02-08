
Draw.loadPlugin(function(ui)
{
	var graph = ui.editor.graph;

	
	ui.loadLibrary(
		new LocalLibrary(
		  ui,
		    '<mxlibrary>[{"xml":"7VbbjtMwEP2aPCIlcSnwSNvtgsRqV3T5ADcZmkFOHNlO0/Tr8cTOpUuKVtDuCgmplTJjz+2cOVECtswPt4qX2Z1MQQTsJmBLJaVxT/lhCUIEcYhpwFZBHIf2H8TrM6dRexqWXEFhJgLk9gckxt4QfEvF6MLt1/tvDy6uSxOTaQPieRCzAw/YIqA8pz+brYRii9oae9QVF6i5QVk8NiW4PEYBuMz0NPix2Nv+pGqeV8e235U6HVubRviUusZc8MJaC224Mhs80gnFLzKp8CgLw2liciQZivQLb2RFIFFvnTG6+0jNs1VknQo0Hvm2rdXG0wUsQPmR2jnZQpY8QdNYx/uwnYUm34MycDhLT+QhaNcAZA6GUAlrTE3mbrDIURhmgLusC5t7J9fOsetjB7btg4eqMz3/Z3fh85iYYR/YS+6DO/yEoLhKsuZqG1NnaGBjKSO7tgok9k0uPOd/QmY8TaYPmHnK/EgdgyOqo3CC6tlfM/3La2Lmp+Gi8mA4xwgdSHew8SaIraxvBseiddiDsbDG2ClZFSmkXi0uNyX8PXC2vqxUAqOds7vA1Q78rbfT8CoQds/2p9mn0PKhDxILM9DS68vz8qZ3dDlcWz7sCeh9H1M8TEnsjhtQaBFrS6xAJwpLksmYiI6obuLXE55uBXIx0X1HIZZSSNWaLAw/rte0I+S/7xVHOriI5KIPp9zGr6e5+b+puXcvozm7CtfUHJhMpvpZkusG/i+5y0iu19f1NWfN4cvZbcr4w/on","w":310,"h":160,"aspect":"fixed"},{"xml":"3VbbjpswEP0aHisBTtP2sSSb7cO2u2q2H2BgGtwajIwJIV/f8Q3IlqwqNbtRGyWSZzwz9sw5hxCQVXm4lbQuPosceEBuArKSQii7Kg8r4DyIQ5YHZB3EcYi/IN6c2Y3MblhTCZWaSRDpD8gURnCa6sN0wO3X+28PNs+XibWJCfEyiMmBBiQJdJ3TL1aroUpZg8aeNS3lrKGKieqxr8HWURLAVtar0Y+nfxEKUiF+/tlJ2IA/7LTxRvXcFW06VnJaoZU0ikq1ZUe9o/OTQkh2FJWiumftyArG8zvai1aPSd/OG5PYR319so7QKaFhR5qas0y+DmAVSNeU6ZQkoqYZUz063uuo74zzleBCmhuSjfmYHvVM9iAVHM4CF7nRGIKAKEHJHkM6lqvCRpDIghsWwHaFT1s6J22sYzfkjjzAhRuhNx0zzrLkjqbomKI20oW8Ll3s9icGksqs6G0M8OpyVOoKpmCLWGq7Q3FqWqiSOzJcEuV4HmWXsHBYuiY9tBMOROEMBxZ/TYHfniwL1w3lrRuSdUymBvkOts4EnoruZnQkxoEbUyVOZypFW+WQO3nZ2rrg84PD80UrM5jwENlB5Q5c1Nv58UrgyL39afW5abnUB8EqNcIyCM/h8mZw+Br2Wi7tydCHe8zhMKc9W3oNTSZZrSUzdXuAfKcvLcL0GRE2RjIXk+ETYYXhx83GC+5+0KBWwEXEFn04RTW+ntqW/6ba3r2O2pAK11ab7/Saf3n/l9oGab283NAc37AtSaYv4L8A","w":310,"h":160,"aspect":"fixed"}]</mxlibrary>',
		    "openBIS Library"
		)
	  );
	
	
	
	
	
	
	 graph.addListener(mxEvent.ADD_CELLS, function(sender, evt)
	  {
		  //console.log('cell added');
		var cells = evt.getProperty('cells');
		console.log('länge:\t' + cells.length);
		let treeCells = extractTreeCells(cells);
		if (treeCells.length >= 1)
		{
			mxUtils.forEach(treeCells, function(treeCell)
			{
				//console.log('tree cell: ' + treeCell.getId());
				let treeParent = determineTreeParent(treeCell);
				console.log('ID of tree parent: ' + treeParent.getId());

				let treeParentLevel = getTreeParentLevel(treeParent);
				console.log('level of tree parent: ' + treeParentLevel);
				setTreeOpenbisValue(treeCell, 'inventory', treeParentLevel);
			});
		}
		else
		{
			console.log('The added cell does not belong to an openBIS tree.' + cells[0].getId());
		}
	  });
	  
	 

	function extractTreeCells(cells)
	{
		let treeCells = graph.model.filterCells(cells, function(cell)
		{	
			if (isOpenbisMember(cell.parent) == true && cell.isVertex() == true)
			{
				return true;
			}
			else
			{
				return false;
			}
		});
		return treeCells; 
	};




	 function determineTreeParent(cell)
	 {
		let edgesIn = graph.getIncomingEdges(cell);
		let tree_parent = edgesIn[0].getTerminal(1); // getTerminal: boolean indicates if source (1) or target (0) should be determined
		return tree_parent;
	 };


	 function getTreeParentLevel(cell)
	 {
		let openbisNodes = getOpenBIS(cell);
		if (openbisNodes.length > 1)
		{
			console.log('The value of the treeParent cell with ID: ' + cell.getId() + ' ' + 'contains multiple openBIS nodes. The first one is chosen. Please make sure this is correct.');
		}
		else if (openbisNodes.length == 0)
		{
			console.log('The value of the treeParent cell with ID: ' +  cell.getId() + ' ' + 'does not contain an openBIS node. This should not happen. Please make sure this is correct.');
		}
		else 
		{
			let level = openbisNodes[0].getAttribute('treeHierarchy');
			return level; 
		}
	 }


	function getOpenbisNode(node)
	{
		if(mxUtils.isNode(node, 'openbis') == true)
		{
			return node;
		}
	}


	function getOpenBIS(cell)
	{
		let cellValue = cell.getValue();
		let openbisNodes = [];

		if(typeof cellValue != 'undefined')
		{
			let valueChildNodes = mxUtils.getChildNodes(cellValue); //this is an array
			openbisNodes = valueChildNodes.filter(getOpenbisNode);
		}

		return openbisNodes;
	};

	function isOpenbisMember(cell)
	{
		let openbisNodes = getOpenBIS(cell);
		if(openbisNodes.length > 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	};


	function setTreeOpenbisValue(cell, treeType, treeParentLevel)
	{
			let openbisNode = getOpenBIS(cell);
			setOpenbisTreeCell(cell, treeParentLevel);
	};

	function setOpenbisTreeCell(cell, treeParentLevel)
	{
		style_space = 'fillColor=#00AFF0;fillOpacity=100;fontColor=#000000'; //fillColor=#00FF80
		style_project = 'fillColor=#00556E;fillOpacity=100;fontColor=#FFFFFF'; //fillColor=#29b6f2
		style_collection = 'fillColor=#501010;fillOpacity=100;fontColor=#FFFFFF'; //fillColor=#FF6666
		style_object = 'fillColor=#D2001E;fillOpacity=100;fontColor=#FFFFFF'; //fillColor=#FFFFFF;allowArrows=0;dashed=1;
		let openbisNode = getOpenBIS(cell)[0];
		if(treeParentLevel == 'inventory' || treeParentLevel == 'labNotebook')
		{
			cell.setAttribute('label', '');
			cell.setAttribute('Description', '');
			graph.model.setStyle(cell, style_space);
			openbisNode.setAttribute('treeHierarchy', 'space');
		}
		else if(treeParentLevel == 'space')
		{
			cell.setAttribute('label', '');
			cell.setAttribute('Description', '');
			graph.model.setStyle(cell, style_project);

			openbisNode.setAttribute('treeHierarchy', 'project');

		}
		else if(treeParentLevel == 'project')
		{
			cell.setAttribute('label', '');
			cell.setAttribute('Description', '');
			graph.model.setStyle(cell, style_collection);

			openbisNode.setAttribute('treeHierarchy', 'collection');

		}
		else if(treeParentLevel == 'collection')
		{
			cell.setAttribute('label', '');
			cell.setAttribute('Description', '');
			graph.model.setStyle(cell, style_object);

			openbisNode.setAttribute('treeHierarchy', 'object');

		}
	}


	
	
	
	
	
	//old
	
	// Adds resource for action
	mxResources.parse('extractText=Extract Text...');

	// Adds action
	ui.actions.addAction('extractText', function()
	{

		//Id of inventory
		var inventory = graph.model.getCell('_Dsneq3O4USU00xQfz6U-2');
		var filter = function(cell)
		{
			if(cell.getAttribute('openBIS-hierarchy') == 'inventory')
			{
				return cell;
			}
		}
		var blocks = graph.model.filterDescendants(filter);
		console.log(blocks.length);
		

		const output = {
			spaces: ["SPACE\nId\tCode\tDescription"],
			projects: ["PROJECT\nId\tCode\tDescription\tSpace"],
			result: [],
			addEmptyLine: function()
			{
				this.spaces.push("");
				this.projects.push("");
			},
			currentSpace: '',
			currentProject: '',
			createOutput: function()
			{
				this.addEmptyLine();
				this.result.push(this.spaces.join('\n'));
				this.result.push(this.projects.join('\n'));
				console.log(this.result.join('\n'));
	

			}
		  };

		

		

		graph.traverse(inventory, true, function (vertex, edge)
		{
		   var line = [] ;
		   if(vertex.getAttribute('openBIS-hierarchy') == 'space')
		   {
				output.currentSpace = vertex.getAttribute('label').toUpperCase();
				line.push(vertex.getId());
				line.push(vertex.getAttribute('Code').toUpperCase());
				line.push(vertex.getAttribute('Description'));
				output['spaces'].push(line.join('\t'));
				
		   }
		   else if(vertex.getAttribute('openBIS-hierarchy') == 'project')
		   {
				output.currentProject = vertex.getAttribute('label').toUpperCase();
				line.push(vertex.getId());
				line.push(vertex.getAttribute('Code').toUpperCase());
				line.push(vertex.getAttribute('Description'));
				line.push(output.currentSpace);
				output['projects'].push(line.join('\t'));

		   }

		});

		

		output.createOutput();
		





		var dlg = new EmbedDialog(ui, output.result.join('\n'),
			null, null, null, 'Dateiname:', null, null, "ausgaben.tsv");
		ui.showDialog(dlg.container, 450, 250, false, true, function(){console.log('something was done');}, true, false, function(){console.log('resize event')}, true);
		dlg.init();
	});
	
	var menu = ui.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'extractText', '-', 'createXml', '-', 'testing'], parent);
	};
	
	//WRITE FILE

	function getContent()
	{
		console.log('weoieoeojoe');
	}

	var doc = mxUtils.createXmlDocument();
	var openbisRoot = doc.createElement('openbis');
	var entityTypesNode = doc.createElement('entityTypes');
	var entityInstancesNode = doc.createElement('entityInstances');
	/*
	doc.appendChild(openbisRoot);
	openbisRoot.appendChild(entityTypesNode);
	openbisRoot.appendChild(entityInstancesNode);
	var xmlString = mxUtils.getPrettyXml(doc);
	*/


	const xmlFile =
		{
			space: {},
			project: {},
			collection: {},
			object: {},

			/**
			 * In openBIS space and project are folders
			 * @param {mxCell} cell
			 * @param {string} code
			 */
			setFolderAttributes: function(cell, code)
			{
				console.log('setFilderAtributes beginning');
				this.space.setAttribute('code', code);
				if (typeof cell.getAttribute('Description') != 'undefined')
				{
					//console.log(cell.getAttribute('label') + 'description does exist');
					this.space.setAttribute('description', cell.getAttribute('Description'));
				}
			},
			/**
			 * 
			 * @param {*} cell 
			 */
			checkDescription: function(cell)
			{
				if (typeof cell.getAttribute('Description') == 'undefined')
				{
					console.log(cell.getAttribute('label') + 'no description!!!');
				}
				else if (typeof cell.getAttribute('Description') != 'undefined')
				{
					console.log(cell.getAttribute('label') + 'description!!!');
				}
			},
			/**
			 * 
			 * @param {*} cell 
			 */
			createCode: function(cell)
			{
				if(typeof cell.getAttribute('label') != 'undefined' && cell.getAttribute('label') != '')
				{
					let label = cell.getAttribute('label');
					let code = label.toUpperCase();
					code = code.replace(/ /g, "_");
					return code;
				}
				else
				{
					//raise alert that label does not exist and
					//highlight the corresponding cell
					console.log('The cell with ' + cell.getId() + ' ' + 'does not have a code. Please insert a text!');
					ui.alert('The cell with ID ' + cell.getId() + ' ' + 'does not have a code. Please insert a text!');
					return "";
				}

			},
			validCode: /[^0-9A-Z_.-]/g,
			isCodeValid: function(code)
			{
				//let valResult = this.validCode.test(code);
				//console.log('code: ' + code + ' valResult: ' + valResult);
				if(code.length == 0) 
				{
					//empty string is invalid
					this.AreAllCodesCorrect = false; 
					return false; 

				}
				else
				{
					if (this.validCode.test(code) == true) 
					{
						//raise alert/error... contains invalid characters
						//alert('The code ' + code + ' ' + 'is invalid. Please make sure that the code contains only alphanumeric characters and _ . -');
						console.log('The code: ' + code + ' ' + 'is invalid.');
						return false;
					}
					else
					{
						//contains only valid characters and exists 
						console.log('The code: ' + code + ' ' + 'is valid');
						return true; 
					}
				}
				
				
			},
			codes: new Set() ,
			AreAllCodesCorrect: true,
			isCodeUnique: function(code)
			{
				let codeMembership = this.codes.has(code); //checks if code already exists
				if (codeMembership == true)
				{
					alert('The code ' + code + ' ' + 'is not unique.');
					this.AreAllCodesCorrect = false;
					return false;
				}
				else 
				{
					return true;
				}
				
			},
			createXmlNode: function(treeHierarchy, vertex, code, isInventory)
			{
				console.log('Vertex: ' + typeof vertex);
				console.log('createXmlNode beginning');
				if(treeHierarchy == 'space')
				{
					this.createXmlNodeSpace(treeHierarchy, vertex, code, isInventory);
				}
				else if (treeHierarchy == 'project')
				{
					this.createXmlNodeProject(treeHierarchy, vertex, code);
				}
				else if (treeHierarchy == 'collection')
				{
					this.createXmlNodeCollection(treeHierarchy, vertex, code);
				}
				else if (treeHierarchy == 'object')
				{
					this.createXmlNodeObject(treeHierarchy, vertex, code);
				}
			},
			/**
			 * 
			 * @param {*} treeHierarchy 
			 * @param {*} vertex 
			 * @param {*} code 
			 * @param {boolean} isInventory -separates lab notebook spaces from inventory spaces
			 */
			createXmlNodeSpace: function(treeHierarchy, vertex, code, isInventory)
			{
				this.space = doc.createElement(treeHierarchy);
				console.log('space node space end' + typeof vertex);
				this.setFolderAttributes(vertex, code);
				if(isInventory == true)
				{
					this.space.setAttribute('inventory', 'true');
				}
				else
				{
					this.space.setAttribute('inventory', 'false');
				}
				//this.checkDescription(vertex);
				entityInstancesNode.appendChild(this.space);
				
			},
			createXmlNodeProject: function(treeHierarchy, vertex, code)
			{
				this.project = doc.createElement(treeHierarchy);
				this.setFolderAttributes(vertex, code);
				this.space.appendChild(xmlFile.project);
			},
			createXmlNodeCollection: function(treeHierarchy, vertex, code)
			{
				this.collection = doc.createElement(treeHierarchy);
				this.collection.setAttribute('code', vertex.getAttribute('label'));
				this.project.appendChild(xmlFile.collection);
			},
			createXmlNodeObject: function(treeHierarchy, vertex, code)
			{
				this.object = doc.createElement(treeHierarchy);
				this.object.setAttribute('code', vertex.getAttribute('label'));
				this.collection.appendChild(xmlFile.object);
			},
			export: function()
			{
				//
			},
			/**
			 * https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
			 */
			removeAllChildNodes: function(parent) 
			{
				while (parent.firstChild) {
					parent.removeChild(parent.firstChild);
				}
			},
			resetXmlDocument: function(document)
			{
				this.removeAllChildNodes(document);
				document.appendChild(openbisRoot);
				openbisRoot.appendChild(entityTypesNode);
				openbisRoot.appendChild(entityInstancesNode);
				this.codes.clear();
				this.AreAllCodesCorrect = true;

			}
		};





	// Adds resource for action
	mxResources.parse('createXml=Create Exchange Format for OpenBIS...');

	var filterInventory = function(cell)
	{
		if(isOpenbisMember(cell))
		{
			console.log('openbis member: ' + cell.getId());
			let openbisNode = getOpenBIS(cell);
			console.log(openbisNode[0]);
			if(openbisNode[0].getAttribute('treeHierarchy') == 'inventory')
			{
				console.log('inventory found');
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}	
	}
	var filterNotebook = function(cell)
	{
		if(isOpenbisMember(cell))
		{
			console.log('openbis member: ' + cell.getId());
			let openbisNode = getOpenBIS(cell);
			console.log(openbisNode[0]);
			if(openbisNode[0].getAttribute('treeHierarchy') == 'eln')
			{
				console.log('eln found');
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}	

	}

	
	
	function getOpenbisTreeRoots()
	{
		console.log('beginning getOpenbisTreeRoots');
		var inventoryRoots = graph.model.filterDescendants(filterInventory);
		var notebookRoots = graph.model.filterDescendants(filterNotebook);
		return {inventoryRoots, notebookRoots};
	};

	
	function graphTraversal(treeRoot, isInventory)
	{
		graph.traverse(treeRoot, true, function (vertex, edge)
		{
			let openbisNode = getOpenBIS(vertex)[0];
			let treeHierarchy = openbisNode.getAttribute('treeHierarchy');
			console.log('treeHier' + treeHierarchy);
			if (treeHierarchy != 'inventory')
			{
				let code = xmlFile.createCode(vertex);
				if (xmlFile.isCodeValid(code) == true && xmlFile.isCodeUnique(code))
				{
					xmlFile.codes.add(code);
					xmlFile.createXmlNode(treeHierarchy, vertex, code, isInventory);
				}
			}	
		});
	}


	// Adds action
	ui.actions.addAction('createXml', function()
	{
		console.log('huhu');
		getContent();
		console.log('lalalla');
		
		let {inventoryRoots, notebookRoots} = getOpenbisTreeRoots();
		console.log('kommt man bis hier?');
		xmlFile.resetXmlDocument(doc);
		if(inventoryRoots.length == 0 && notebookRoots.length == 0)
		{
			console.log('alert: no data');
			ui.alert('No data');
		}
		else if(inventoryRoots.length > 1)
		{
			console.log('alert: too many inventories');
			ui.alert('Too many inventories');
		}
		else if(notebookRoots.length > 1)
		{
			ui.alert('Too many lab notebooks');
		}
		else
		{
			if(inventoryRoots.length == 1)
			{
				console.log('one invt: ' + inventoryRoots[0].getId());
				graphTraversal(inventoryRoots[0], true);
			}
			if(notebookRoots.length == 1)
			{
				graphTraversal(notebookRoots[0], false);
			}
			console.log('All Coes unique? ' + xmlFile.AreAllCodesCorrect);
			if(xmlFile.AreAllCodesCorrect == true)
			{
				var dlg = new EmbedDialog(ui, mxUtils.getPrettyXml(doc), null, null, null, 'Dateiname:', null, null, "openbisInitialisation.xml");
				ui.showDialog(dlg.container, 450, 250, false, true, function(){console.log('something was done');}, true, false, function(){console.log('resize event')}, true);
				dlg.init();
			}
			
		}


		
			

		//TESTING AREA
		
		console.log(mxUtils.getPrettyXml(doc));
		console.log(mxUtils.getPrettyXml(doc).length);
		console.log('now is the end');


	});

	// Adds resource for action
	mxResources.parse('entityDialog=Change openBIS Data...');

	var uiCreatePopupMenu = ui.menus.createPopupMenu;
	ui.menus.createPopupMenu = function(menu, cell, evt)
	{
		uiCreatePopupMenu.apply(this, arguments);
		
		var graph = ui.editor.graph;
		
		if (graph.model.isVertex(graph.getSelectionCell()))
		{
			this.addMenuItems(menu, ['-', 'entityDialog'], null, evt);
		}
	};

	//
	// Main function
	//
	function anotherName()
	{
		console.log('grüßli');
		
	};
	
	// Adds action
	ui.actions.addAction('entityDialog', function()
	{
		anotherName();
		console.log('es wird');
		var cell = graph.getSelectionCell() || graph.getModel().getRoot();
		ui.showEntityDialog(cell);
	}, null, null, Editor.ctrlKey + '+O');


	EditorUi.prototype.showEntityDialog = function(cell)
	{

		if (cell != null)
		{
			var dlg = new EditEntityDialog(this, cell);
			//var dlg = new EmbedDialog(ui, mxUtils.getPrettyXml(doc), null, null, null, 'Dateiname:', null, null, "openbisInitialisation.xml");
			this.showDialog(dlg.container, 480, 420, true, false, null,false);
			dlg.init();
		}
	};


	var EditEntityDialog = function(ui, cell)
{
	var cellID = cell.getId();
	console.log('cellid: ' + cell.id);
	let oNode = getOpenBIS(cell)[0];
	console.log(oNode.getAttribute('treeHierarchy'));

	var div = document.createElement('div');
	var graph = ui.editor.graph;
	
	var value = graph.getModel().getValue(cell);
	
	// Converts the value to an XML node
	if (!mxUtils.isNode(value))
	{
		var doc = mxUtils.createXmlDocument();
		var obj = doc.createElement('object');
		obj.setAttribute('label', value || '');
		value = obj;
	}
	
	var meta = {};
	
	try
	{
		var temp = mxUtils.getValue(ui.editor.graph.getCurrentCellStyle(cell), 'metaData', null);
		
		if (temp != null)
		{
			meta = JSON.parse(temp);
		}
	}
	catch (e)
	{
		// ignore
	}
	
	// Creates the dialog contents
	var form = new mxForm('entities');
	form.table.style.width = '100%';

	var attrs = value.attributes;
	var names = [];
	var texts = [];
	var count = 0;

	var id = (EditDataDialog.getDisplayIdForCell != null) ?
		EditDataDialog.getDisplayIdForCell(ui, cell) : null;
	
	var addRemoveButton = function(text, name)
	{
		var wrapper = document.createElement('div');
		wrapper.style.position = 'relative';
		wrapper.style.paddingRight = '20px';
		wrapper.style.boxSizing = 'border-box';
		wrapper.style.width = '100%';
		
		var removeAttr = document.createElement('a');
		var img = mxUtils.createImage(Dialog.prototype.closeImage);
		img.style.height = '9px';
		img.style.fontSize = '9px';
		img.style.marginBottom = (mxClient.IS_IE11) ? '-1px' : '5px';
		
		removeAttr.className = 'geButton';
		removeAttr.setAttribute('title', mxResources.get('delete'));
		removeAttr.style.position = 'absolute';
		removeAttr.style.top = '4px';
		removeAttr.style.right = '0px';
		removeAttr.style.margin = '0px';
		removeAttr.style.width = '9px';
		removeAttr.style.height = '9px';
		removeAttr.style.cursor = 'pointer';
		removeAttr.appendChild(img);
		
		var removeAttrFn = (function(name)
		{
			return function()
			{
				var count = 0;
				
				for (var j = 0; j < names.length; j++)
				{
					if (names[j] == name)
					{
						texts[j] = null;
						form.table.deleteRow(count + ((id != null) ? 1 : 0));
						
						break;
					}
					
					if (texts[j] != null)
					{
						count++;
					}
				}
			};
		})(name);
		
		mxEvent.addListener(removeAttr, 'click', removeAttrFn);
		
		var parent = text.parentNode;
		wrapper.appendChild(text);
		wrapper.appendChild(removeAttr);
		parent.appendChild(wrapper);
	};
	
	let openbisAttrs = oNode.attributes;
		console.log(openbisAttrs[1].name + openbisAttrs[1].nodeValue);

	var addTextArea = function(index, name, value)
	{
		names[index] = name;
		texts[index] = form.addTextarea(names[count] + ':', value, 2);
		texts[index].style.width = '100%';


		if (value.indexOf('\n') > 0)
		{
			texts[index].setAttribute('rows', '2');
		}
		
		addRemoveButton(texts[index], name);
		
		if (meta[name] != null && meta[name].editable == false)
		{
			texts[index].setAttribute('disabled', 'disabled');
		}
	};
	
	var temp = [];
	var isLayer = graph.getModel().getParent(cell) == graph.getModel().getRoot();

	for (var i = 0; i < attrs.length; i++)
	{
		if ((isLayer || attrs[i].nodeName != 'label') && attrs[i].nodeName != 'placeholders')
		{
			temp.push({name: attrs[i].nodeName, value: attrs[i].nodeValue});
		}
	}
	
	// Sorts by name
	temp.sort(function(a, b)
	{
	    if (a.name < b.name)
	    {
	    	return -1;
	    }
	    else if (a.name > b.name)
	    {
	    	return 1;
	    }
	    else
	    {
	    	return 0;
	    }
	});

	if (id != null)
	{	
		var text = document.createElement('div');
		text.style.width = '100%';
		text.style.fontSize = '11px';
		text.style.textAlign = 'center';
		mxUtils.write(text, id);
		var hallo = document.createElement('div');
		mxUtils.write(hallo, 'hallohallo');
		
		//var idInput = form.addField(mxResources.get('id') + ':', text);
		var testInput = form.addField('Test:', hallo);
		var AreaInput = form.addTextarea('Prop1:', 'halloAreaInput',2);
		console.log(AreaInput.value);
		console.log('read out');
		var combotest = form.addCombo('COMBO:' ,false, 1);
		form.addOption(combotest, 'labelOption1', 'OPTION1', false);
		form.addOption(combotest, 'labelOption2', 'OPTION2', true);
		form.addOption(combotest, 'labelOption3', 'OPTION3', false);
		form.addCheckbox('namecheck', true);
		form.addText('nameText', 'val', true)
		//var testCell = graph.model.getCell('6BlT60FBLKf2mpYVhe83-6');
		//testCell.setAttribute('testBeschreibung', AreaInput.value);
		console.log('testcell removed');


		console.log('attrs loop');
		openbisFormElements = [];
		for (let i = 0; i < openbisAttrs.length; i++)
		{
			console.log(openbisAttrs[i].name);
			openbisFormElements[i] = form.addTextarea(openbisAttrs[i].name, openbisAttrs[i].nodeValue,2);
		}


		
		mxEvent.addListener(text, 'dblclick', function(evt)
		{
			if (mxEvent.isShiftDown(evt))
			{
				var dlg = new FilenameDialog(ui, id, mxResources.get('apply'), mxUtils.bind(this, function(value)
				{
					if (value != null && value.length > 0 && value != id)
					{
						if (graph.getModel().getCell(value) == null)
						{
							graph.getModel().cellRemoved(cell);
							cell.setId(value);
							id = value;
							idInput.innerHTML = mxUtils.htmlEntities(value);
							graph.getModel().cellAdded(cell);
						}
						else
						{
							ui.handleError({message: mxResources.get('alreadyExst', [value])});
						}
					}
				}), mxResources.get('id'));
				ui.showDialog(dlg.container, 300, 80, true, true);
				dlg.init();
			}
		});

		text.setAttribute('title', 'Shift+Double Click to Edit ID');
	}
	
	for (var i = 0; i < temp.length; i++)
	{
		addTextArea(count, temp[i].name, temp[i].value);
		count++;
	}
	
	
	
	this.init = function()
	{
		if (texts.length > 0)
		{
			texts[0].focus();
		}
		else
		{
			nameInput.focus();
		}
	};
	var top = document.createElement('div');
	top.style.position = 'absolute';
	top.style.top = '30px';
	top.style.left = '30px';
	top.style.right = '30px';
	top.style.bottom = '80px';
	top.style.overflowY = 'auto';
	
	top.appendChild(form.table);

	var newProp = document.createElement('div');
	newProp.style.boxSizing = 'border-box';
	newProp.style.paddingRight = '160px';
	newProp.style.whiteSpace = 'nowrap';
	newProp.style.marginTop = '6px';
	newProp.style.width = '100%';
	
	var nameInput = document.createElement('input');
	nameInput.setAttribute('placeholder', mxResources.get('enterPropertyName'));
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('size', (mxClient.IS_IE || mxClient.IS_IE11) ? '36' : '40');
	nameInput.style.boxSizing = 'border-box';
	nameInput.style.marginLeft = '2px';
	nameInput.style.width = '100%';
	
	//newProp.appendChild(nameInput);
	top.appendChild(newProp);
	div.appendChild(top);

	
	var addBtn = mxUtils.button(mxResources.get('addProperty'), function()
	{
		var name = nameInput.value;

		// Avoid ':' in attribute names which seems to be valid in Chrome
		if (name.length > 0 && name != 'label' && name != 'placeholders' && name.indexOf(':') < 0)
		{
			try
			{
				var idx = mxUtils.indexOf(names, name);
				
				if (idx >= 0 && texts[idx] != null)
				{
					texts[idx].focus();
				}
				else
				{
					// Checks if the name is valid
					var clone = value.cloneNode(false);
					clone.setAttribute(name, '');
					
					if (idx >= 0)
					{
						names.splice(idx, 1);
						texts.splice(idx, 1);
					}

					names.push(name);
					var text = form.addTextarea(name + ':', '', 2);
					text.style.width = '100%';
					texts.push(text);
					addRemoveButton(text, name);

					text.focus();
				}

				addBtn.setAttribute('disabled', 'disabled');
				nameInput.value = '';
			}
			catch (e)
			{
				mxUtils.alert(e);
			}
		}
		else
		{
			mxUtils.alert(mxResources.get('invalidName'));
		}
	});
	
	
	this.init = function()
	{
		if (texts.length > 0)
		{
			texts[0].focus();
		}
		else
		{
			nameInput.focus();
		}
	};
	
	addBtn.setAttribute('title', mxResources.get('addProperty'));
	addBtn.setAttribute('disabled', 'disabled');
	addBtn.style.textOverflow = 'ellipsis';
	addBtn.style.position = 'absolute';
	addBtn.style.overflow = 'hidden';
	addBtn.style.width = '144px';
	addBtn.style.right = '0px';
	addBtn.className = 'geBtn';
	//newProp.appendChild(addBtn);

	var cancelBtn = mxUtils.button(mxResources.get('cancel'), function()
	{
		ui.hideDialog.apply(ui, arguments);
	});
	
	cancelBtn.className = 'geBtn';
	
	var applyBtn = mxUtils.button(mxResources.get('apply'), function()
	{
		try
		{

		
			console.log('on apply');


			ui.hideDialog.apply(ui, arguments);
			
			// Clones and updates the value
			value = value.cloneNode(true);
			console.log(value);
			console.log(AreaInput.value);
			var removeLabel = false;
			
			for (var i = 0; i < names.length; i++)
			{
				console.log('before set Attr');
				console.log(texts[i].value);
				if (texts[i] == null)
				{
					value.removeAttribute(names[i]);
				}
				else
				{
					value.setAttribute(names[i], texts[i].value);
					value.setAttribute('complNew', AreaInput.value);
					console.log(texts[i].value);
					removeLabel = removeLabel || (names[i] == 'placeholder' &&
						value.getAttribute('placeholders') == '1');
				}
			}

			var oNodeNew = oNode.cloneNode(true);
			for (var i = 0; i < openbisAttrs.length; i++)
			{
				oNodeNew.setAttribute(openbisAttrs[i].name, openbisFormElements[i].value);
				//console.log(openbisAttrs[i].name );
				//console.log(openbisFormElements[i].value);
			}
			console.log('before replacement');
		
			console.log('after replace');
			console.log(value.childNodes);

			for (let i = 0; i < value.childNodes.length; i++)
			{
				console.log(value.childNodes[i].tagName);
				if(value.childNodes[i].tagName == 'openbis')
				{
					value.removeChild(value.childNodes[i]);
					console.log('true');
				}
			}
			console.log('openbischilds');
			console.log(value.childNodes);
			value.appendChild(oNodeNew);
			console.log(value.childNodes);
			

			//console.log(oNodeNew);
			//console.log(oNode.parentNode.nodeName);
			//value.removeChild(oNode);

			// Removes label if placeholder is assigned
			if (removeLabel)
			{
				value.removeAttribute('label');
			}
			
			// Updates the value of the cell (undoable)
			graph.getModel().setValue(cell, value);
			console.log(value);
		}
		catch (e)
		{
			mxUtils.alert(e);
		}
	});
	applyBtn.className = 'geBtn gePrimaryBtn';
	
	function updateAddBtn()
	{
		if (nameInput.value.length > 0)
		{
			addBtn.removeAttribute('disabled');
		}
		else
		{
			addBtn.setAttribute('disabled', 'disabled');
		}
	};

	mxEvent.addListener(nameInput, 'keyup', updateAddBtn);
	
	// Catches all changes that don't fire a keyup (such as paste via mouse)
	mxEvent.addListener(nameInput, 'change', updateAddBtn);
	
	var buttons = document.createElement('div');
	buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;'
	
	if (ui.editor.graph.getModel().isVertex(cell) || ui.editor.graph.getModel().isEdge(cell))
	{
		var replace = document.createElement('span');
		replace.style.marginRight = '10px';
		var input = document.createElement('input');
		input.setAttribute('type', 'checkbox');
		input.style.marginRight = '6px';
		
		if (value.getAttribute('placeholders') == '1')
		{
			input.setAttribute('checked', 'checked');
			input.defaultChecked = true;
		}
	
		mxEvent.addListener(input, 'click', function()
		{
			if (value.getAttribute('placeholders') == '1')
			{
				value.removeAttribute('placeholders');
			}
			else
			{
				value.setAttribute('placeholders', '1');
			}
		});
		
		/*replace.appendChild(input);
		mxUtils.write(replace, mxResources.get('placeholders'));
		
		if (EditDataDialog.placeholderHelpLink != null)
		{
			var link = document.createElement('a');
			link.setAttribute('href', EditDataDialog.placeholderHelpLink);
			link.setAttribute('title', mxResources.get('help'));
			link.setAttribute('target', '_blank');
			link.style.marginLeft = '8px';
			link.style.cursor = 'help';
			
			var icon = document.createElement('img');
			mxUtils.setOpacity(icon, 50);
			icon.style.height = '16px';
			icon.style.width = '16px';
			icon.setAttribute('border', '0');
			icon.setAttribute('valign', 'middle');
			icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
			icon.setAttribute('src', Editor.helpImage);
			link.appendChild(icon);
			
			replace.appendChild(link);
		}
		*/
		
		buttons.appendChild(replace);
	}
	
	if (ui.editor.cancelFirst)
	{
		buttons.appendChild(cancelBtn);
		buttons.appendChild(applyBtn);
	}
	else
	{
		buttons.appendChild(applyBtn);
		buttons.appendChild(cancelBtn);
	}

	div.appendChild(buttons);



	
	this.container = div;
};



	/* vertex wird kurz hinzugefügt und dann ist es unsichtbar
	var parent = ui.editor.graph.getDefaultParent();
    var model = graph.getModel();
	var index = model.getChildCount(parent);
	var v1 = graph.insertVertex(graph.model.getCell('1'), null, 'Doubleclick', 20, 20, 80, 30);
	graph.getModel().beginUpdate();
	try
	{
		console.log('tadaaaaaa');
		model.add(parent, v1,index);
	}
	finally
	{
		graph.getModel().endUpdate();
	}

	graph.model.setStyle(v1, 'fillColor=#00FF80;fillOpacity=100;');
	*/

	
	/*
	var parent = ui.editor.graph.getDefaultParent();
    var v1 = graph.insertVertex(graph.model.getCell('1'), null, 'Doubleclick', 20, 20, 80, 30);
	 graph.model.setStyle(v1, 'fillColor=#00FF80;fillOpacity=100;');
	 graph.cellRenderer.redraw;
	console.log(graph.isCellVisible(v1));
	console.log(graph.isCellSelectable(v1));
	graph.view.revalidate();
	console.log('after isnert');
	//var v2 = graph.model.getCell('Kn0vO7ZCTQ7agnD9xuEy-1');
	//var v3 = graph.model.cloneCell(v2);


	var model = graph.getModel();
	var index = model.getChildCount(parent);
	model.beginUpdate();
	try
	{
		model.add(parent, v1,index);
	}
	finally
	{
		model.ednUpdate();
	}
	*/
	
});
