/**
 * Text extraction plugin.
 */
Draw.loadPlugin(function(ui)
{
	var graph = ui.editor.graph;
	
	
	ui.loadLibrary(
		new LocalLibrary(
		  ui,
		    '<mxlibrary>[{"xml":"7VZtb5swEP41fJwEOM22r0mabtKqVkv3Axy4hZsMRrYJIb9+PmwCtGSKtHTVpkmJxJ3vxfc89yACtswPd4qX2b1MQQTsNmBLJaVxT/lhCUIEcYhpwFZBHIf2H8TrM6dRexqWXEFhJhLk9gckxkYIvqVmFHD39eHbo8vrysRk2oR4HsTswAO2CKjO+GerlVBsUVtjj7riAjU3KIunpgRXxygAV5meej8We3s/qZr+8BOC4irJGhehS57AZbeww3UXGYOiTSN8Q11jLnhhrYU2XJkNHumE8heZVHiUheGEBzmSDEX6hTeyIgjpcp0xiH2i0dgqsk4FGo982/Zq8ykAC1B+4BYFujzNugdl4HCWrcjP3G4FyBwMgRTWmJrMRbDIMRpmgLusS5t7J9fOsTvl9uTbB49NZ/p1OLsan8c8devB3nw9RhHXWZE6QwObdu3YqraCJLpNLjzJF7EXT7PnE2aeIz9DR9mA2yic4Hb229S+eE3M/DRcVH565xjAAekONt4EsZX1be9YtA57MJTOECwlqyKF1OvB1aaCvwbO9peVSmCwZJZ8rnbgo26m4VUg7GLtx9Wn0PKpjxIL09NyEpTn5V3MniHuruXTnoF+uscUD1OauucGFFrE2hYr0InCknQxJKIjqpv4n3kRf0chllJI1ZosDNfrD7Qj5H+wrdBQX9LBVSQXfRxzG7+d5uZ/p+be/xnNRTevqjkwmUz1RZLrBv4vuetI7qSv19ecNfsvZ7cpww/rnw==","w":310,"h":160,"aspect":"fixed"}]</mxlibrary>',		  "Ontopanel-Library"
		    "openBIS Library"
		)
	  );
	
	
	
	
	
	
	 graph.addListener(mxEvent.ADD_CELLS, function(sender, evt)
	 {
		var cells = evt.getProperty('cells');
		//console.log("ich höre");
		/*
		var id = cells[1].getId();
		var parent = cells[1].getParent().getId();
		var source = cells[1].source;
		console.log("ich höre:" + id + " parent:" + parent + " source: " + source);
		var edges = cells[1].edges;
		console.log("edge-ID: " + edges[0].getId() + "source: " + edges[0].source.getId());
		var root_id = "oCXxoy5enejrwtkBi-wg-2";
		var root = graph.model.getCell(root_id);
		console.log(root);
		edges_out = graph.getOutgoingEdges(root);
		console.log("edges out:");
		console.log(edges_out);
		var cell_id = "oWGSHzPWtzd4GZvuny7O-4";
		var cell = graph.model.getCell(cell_id);
		*/
		 
		var added_cell = cells[1];
		let tree_par_level = determineTreeParent(added_cell);
		//console.log("tree parent with function: " + tree_par.getId());
		console.log("level: " + tree_par_level);
		changeStyle(added_cell, tree_par_level);
		var tree_root = graph.findTreeRoots(added_cell.getParent(), false, false);
		console.log("tree_root-ID");
		console.log(tree_root[0].getId());
		//graph.model.setStyle(tree_root, "connectable=0");

		graph.traverse(tree_root[0], true, function (vertex, edge)
		{
		   console.log(vertex.getId());
		});

		

	 });

	 function determineTreeParent(cell)
	 {
		let edgesIn = graph.getIncomingEdges(cell);
		let tree_parent = edgesIn[0].getTerminal(1); // getTerminal: boolean indicates if source (1) or target (0) should be determined
		//return tree_parent;
		
		let level = tree_parent.getAttribute("openBIS-hierarchy");
		return level;
		
	 };


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
