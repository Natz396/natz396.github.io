
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
					ui.alert('The cell with ' + cell.getId() + ' ' + 'does not have a code. Please insert a text!');
				}

			},
			validCode: /[^0-9A-Z_.-]/g,
			isCodeValid: function(code)
			{
				//let valResult = this.validCode.test(code);
				//console.log('code: ' + code + ' valResult: ' + valResult);
				
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
				
			},
			codes: new Set() ,
			isCodeUnique: function(code)
			{
				let codeMembership = this.codes.has(code); //checks if code already exists
				if (codeMembership == true)
				{
					alert('The code ' + code + ' ' + 'is not unique.');
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
			var dlg = new EmbedDialog(ui, mxUtils.getPrettyXml(doc), null, null, null, 'Dateiname:', null, null, "openbisInitialisation.xml");
			ui.showDialog(dlg.container, 450, 250, false, true, function(){console.log('something was done');}, true, false, function(){console.log('resize event')}, true);
			dlg.init();
		}


		
			

		//TESTING AREA
		
		console.log(mxUtils.getPrettyXml(doc));
		console.log(mxUtils.getPrettyXml(doc).length);
		console.log('now is the end');


	});

	
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
