/**
 * Text extraction plugin.
 */
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


	 function changeStyle(cell, parent_level)
	 {
		style_space = 'fillColor=#00FF80;fillOpacity=100;';
		style_project = 'fillColor=#29b6f2;fillOpacity=100;';
		style_collection = 'fillColor=#FF6666;fillOpacity=100;';
		style_object = 'fillColor=#FFFFFF;fillOpacity=100;dashed=1;allowArrows=0;';


		if (parent_level == "inventory")
		{
			cell.setAttribute("openBIS-hierarchy", "space");
			cell.setAttribute("label", "");
			cell.setAttribute("Code", "");
			cell.setAttribute("Description", "");
			graph.model.setStyle(cell, style_space);
		}
		else if (parent_level == "space")
		{
			cell.setAttribute("openBIS-hierarchy", "project");
			cell.setAttribute("label", "");
			cell.setAttribute("Code", "");
			cell.setAttribute("Description", "");
			graph.model.setStyle(cell, style_project);
			
		
		}
		else if (parent_level == "project")
		{
			cell.setAttribute("openBIS-hierarchy", "collection");
			cell.setAttribute("label", "");
			cell.setAttribute("Code", "");
			cell.setAttribute("Description", "");
			graph.model.setStyle(cell, style_collection);
		}
		else if (parent_level == "collection")
		{
			cell.setAttribute("openBIS-hierarchy", "object");
			cell.setAttribute("label", "");
			cell.setAttribute("Code", "");
			cell.setAttribute("Description", "");
			graph.model.setStyle(cell, style_object);
		}

	 };

	 function print_Id(cell)
	 {
		console.log(cell.getId());
	 };


	
	
	
	
	
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
			null, null, null, 'Dateiname:', null, null, "ausgabe.tsv");
		ui.showDialog(dlg.container, 450, 240, true, true);
		dlg.init();
	});
	
	var menu = ui.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'extractText'], parent);
	};
	
	
	//from Natalie: Check Functionality
	console.log("hallo");
	
});
