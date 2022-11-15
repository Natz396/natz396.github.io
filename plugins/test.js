/**
 * Text extraction plugin.
 */
Draw.loadPlugin(function(ui)
{
	var graph = ui.editor.graph;
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
		style_project = 'fillColor=#29b6f2;fillOpacity=100;';
		style_collection = 'fillColor=#FF6666;fillOpacity=100;';
		if (parent_level == "space")
		{
			cell.setAttribute("openBIS-hierarchy", "project");
			cell.setAttribute("label", "");
			graph.model.setStyle(cell, style_project);
			
		
		}
		else if (parent_level == "project")
		{
			cell.setAttribute("openBIS-hierarchy", "collection");
			cell.setAttribute("label", "");
			graph.model.setStyle(cell, style_collection);
		}

	 };


	
	
	
	
	
	//old
	
	// Adds resource for action
	mxResources.parse('extractText=Extract Text...');

	// Adds action
	ui.actions.addAction('extractText', function()
	{
		var dlg = new EmbedDialog(ui, ui.editor.graph.getIndexableText(),
			null, null, null, 'Extracted Text:');
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
