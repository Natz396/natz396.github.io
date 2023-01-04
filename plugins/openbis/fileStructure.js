
Draw.loadPlugin(function(ui)
{
	var graph = ui.editor.graph;
	
	
	ui.loadLibrary(
		new LocalLibrary(
		  ui,
		    '<mxlibrary>[{"xml":"7VZtb5swEP41fJwEOM22r0mabtKqVkv3Axy4hZsMRrYJIb9+PmwCtGSKtHTVpkmJxJ3vxfc89yACtswPd4qX2b1MQQTsNmBLJaVxT/lhCUIEcYhpwFZBHIf2H8TrM6dRexqWXEFhJhLk9gckxkYIvqVmFHD39eHbo8vrysRk2oR4HsTswAO2CKjO+GerlVBsUVtjj7riAjU3KIunpgRXxygAV5meej8We3s/qZr+8BOC4irJGhehS57AZbeww3UXGYOiTSN8Q11jLnhhrYU2XJkNHumE8heZVHiUheGEBzmSDEX6hTeyIgjpcp0xiH2i0dgqsk4FGo982/Zq8ykAC1B+4BYFujzNugdl4HCWrcjP3G4FyBwMgRTWmJrMRbDIMRpmgLusS5t7J9fOsTvl9uTbB49NZ/p1OLsan8c8devB3nw9RhHXWZE6QwObdu3YqraCJLpNLjzJF7EXT7PnE2aeIz9DR9mA2yic4Hb229S+eE3M/DRcVH565xjAAekONt4EsZX1be9YtA57MJTOECwlqyKF1OvB1aaCvwbO9peVSmCwZJZ8rnbgo26m4VUg7GLtx9Wn0PKpjxIL09NyEpTn5V3MniHuruXTnoF+uscUD1OauucGFFrE2hYr0InCknQxJKIjqpv4n3kRf0chllJI1ZosDNfrD7Qj5H+wrdBQX9LBVSQXfRxzG7+d5uZ/p+be/xnNRTevqjkwmUz1RZLrBv4vuetI7qSv19ecNfsvZ7cpww/rnw==","w":310,"h":160,"aspect":"fixed"}]</mxlibrary>',
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
			console.log('The added cell does not belong to an openBIS tree.');
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
		style_space = 'fillColor=#00FF80;fillOpacity=100;';
		style_project = 'fillColor=#29b6f2;fillOpacity=100;';
		style_collection = 'fillColor=#FF6666;fillOpacity=100;';
		style_object = 'fillColor=#FFFFFF;fillOpacity=100;dashed=1;allowArrows=0;';
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
		
		ui.menus.addMenuItems(menu, ['-', 'extractText', '-', 'createXml'], parent);
	};
	
	//WRITE FILE

	function getContent()
	{
		console.log('weoieoeojoe');
	}

	// Adds resource for action
	mxResources.parse('createXml=Create Exchange Format for OpenBIS...');

	// Adds action
	ui.actions.addAction('createXml', function()
	{
		console.log('huhu');
		getContent();




		var doc = mxUtils.createXmlDocument();
		/*
		var node = doc.createElement('MyNode');
		var spaceNode = doc.createElement('space');
		var projectNode = doc.createElement('project1')
		var collectionNode = doc.createElement('collection');
		node.appendChild(spaceNode);
		spaceNode.appendChild(projectNode);
		projectNode.appendChild(collectionNode);


		doc.appendChild(spaceNode);
		var xmlString = mxUtils.getPrettyXml(doc);
		*/
		var openbisRoot = doc.createElement('openbis');
		var entityTypesNode = doc.createElement('entityTypes');
		var entityInstancesNode = doc.createElement('entityInstances');
		doc.appendChild(openbisRoot);
		openbisRoot.appendChild(entityTypesNode);
		openbisRoot.appendChild(entityInstancesNode);
		var xmlString = mxUtils.getPrettyXml(doc);
		//console.log('xmlstring:\n' + xmlString);
		

		/**
		 * 
		 */
		const xmlFile =
		{
			/**
			 * 
			 * @param {*} cell 
			 */
			setSpaceAttributes: function(cell)
			{
				xmlFile.space.setAttribute('code', cell.getAttribute('label'));
				if (typeof cell.getAttribute('Description') != 'undefined')
				{
					//console.log(cell.getAttribute('label') + 'description does exist');
					xmlFile.space.setAttribute('description', cell.getAttribute('Description'));
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
			createXmlNode:
			
		};

		//xmlFile.space = collectionNode;
		//console.log(mxUtils.getPrettyXml(xmlFile.space));


		var inventory = graph.model.getCell('noLVKMNDz-h90zCbm8VW-2');
		console.log(inventory.getId());

		
		graph.traverse(inventory, true, function (vertex, edge)
		{
			let node = getOpenBIS(vertex)[0];
			let treeHierarchy = node.getAttribute('treeHierarchy');
			if (treeHierarchy != 'inventory')
			{
				let code = xmlFile.createCode(vertex);
				if (xmlFile.isCodeValid(code) == true && xmlFile.isCodeUnique(code))
				{
					//create XML Node
					if (treeHierarchy == 'space')
			{
				xmlFile.space = doc.createElement(treeHierarchy);
				xmlFile.setSpaceAttributes(vertex);
				xmlFile.checkDescription(vertex);
				entityInstancesNode.appendChild(xmlFile.space);
			}
			else if (treeHierarchy == 'project')
			{
				//console.log('project level!');
				xmlFile.project = doc.createElement(treeHierarchy);
				xmlFile.project.setAttribute('code', vertex.getAttribute('label'));
				xmlFile.space.appendChild(xmlFile.project);
			}
			else if (treeHierarchy == 'collection')
			{
				console.log('collection');
				xmlFile.collection = doc.createElement(treeHierarchy);
				xmlFile.collection.setAttribute('code', vertex.getAttribute('label'));
				xmlFile.project.appendChild(xmlFile.collection);
				
			}
			else if (treeHierarchy == 'object')
			{
				xmlFile.object = doc.createElement(treeHierarchy);
				xmlFile.object.setAttribute('code', vertex.getAttribute('label'));
				xmlFile.collection.appendChild(xmlFile.object);
			}
				}
			}

			

			
		});
		
		console.log(mxUtils.getPrettyXml(doc));

		var mat = graph.model.getCell('mRFb_ZpsWFXtCuEC0m-D-2');
		let label = mat.getAttribute('label');
		console.log('label type: ' + typeof label);
		console.log(label.length);
		if (label == '')
		{
			console.log('label empty');
		}
		else
		{
			console.log('label not empty');
		}
		//console.log(mat.getAttribute('Description'));
		
		//alert('HellO!');
		//var popup = new PopupDialog(ui, 'http://localhost:8888/');
		//prompt('A Question...');

		//let cudialog = new CustomDialog(ui, openbisRoot, null, null, 'ok button', null, 'content button', true, 'cancel button', false);
		var content = document.createElement('div');
		var heading = document.createElement('h2');
		mxUtils.setTextContent(heading, 'a headingg!!!');
		content.appendChild(heading);
		//content.appendChild(heading);
		//document.setTextContent(heading, 'Überschrift');
		mxUtils.para(content, 'testest');
		console.log('content\n' + mxUtils.getTextContent(content));
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('name', 'Name');
		input.setAttribute('size', '20');
		heading.appendChild(input);
		var okcklick = function()
		{
			console.log(input.value);
		};
		var btn = document.createElement('button');
		btn.setAttribute('text', 'this is a button');

		var btnfct = function()
		{
			document.createElement('button');
			document.createElement('button');
		};
		var bs = document.createElement('div');
		mxUtils.setTextContent(bs, 'a lot of text');
		var selection = editorUi.addCheckbox(div, mxResources.get('selectionOnly'),
				false, graph.isSelectionEmpty());
		


		//let cudialog = new CustomDialog(ui, openbisRoot, null, null, 'ok button', null, openbisRoot, null, 'cancel button', false);
		let dialog = new CustomDialog(ui,content,okcklick, null, null, null, bs);
		ui.showDialog(dialog.container, 450,250,true, true);



		//<input type="text" name="Name" size="20">


		//function(editorUi, content, okFn, cancelFn, okButtonText, helpLink, buttonsContent, hideCancel, cancelButtonText, hideAfterOKFn)
		/*
		console.log(xmlString);

		var dlg = new EmbedDialog(ui, xmlString,
			null, null, null, 'Dateiname:', null, null, "ausgaben.tsv");
		ui.showDialog(dlg.container, 450, 250, false, true, function(){console.log('something was done');}, true, false, function(){console.log('resize event')}, true);
		dlg.init();
		*/

	});


	//from Natalie: Check Functionality
	console.log("hallo");
    console.log('Na sowas?');
	graph.panningHandler.popup = function(x, y, cell, evt)
    {
      mxUtils.alert('Hello, World!');
    }

	var menu = new mxPopupMenu();
	menu.popup(30,30,graph.model.getCell('ZaSam6QVm_x5w66h-MOY-1'),mxEvent.Click);
	
});
