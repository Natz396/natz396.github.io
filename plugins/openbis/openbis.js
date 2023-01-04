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
	
	
	
	
	//mxscripts('plugins/openbis/fileStructure.js', null, null, null, true);
    //mxscript('plugins/openbis/xmlCreator.js', true, null, null, true);
    //var number = zsm(1,3);
    //console.log("number: " + number);
    mxscript("plugins/webcola/mxWebColaLayout.js", null, null, null, true);
    var graph = ui.editor.graph;
		var layout = new mxWebColaLayout(graph);
		var parent = graph.getDefaultParent(); 
		layout.execute(parent);
	
});
