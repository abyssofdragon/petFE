<template>
	<div id="viewer"></div>
  </template>
  <script>
	import { Viewer } from 'photo-sphere-viewer'
	import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
	import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
	import 'photo-sphere-viewer/dist/plugins/markers.css'
	  export default {
		  data(){
			  return{
				  viewer:'',
				  markersPlugin:'',
				  imgurl1:require('./dating.jpeg'),
				  imgurl2:require('./shoushu.jpeg'),
				  imgurl3:require('./zhuyuan.jpeg'),
			  }
		  },
		  mounted(){
			  this.viewer = new Viewer({
				  container:document.querySelector('#viewer'),
				  panorama:this.imgurl1,
				  size:{
					  width: '95vw',
					  height: '95vh',
				  },
				  plugins: [
					  [MarkersPlugin, {
						  	markers: [
							  	{
									id:'circle',
									tooltip:'去手术室',
									circle:20,
									svgStyle : {
										fill:'rgba(255,255,0,0.3)',
										stroke:'yellow',
										strokeWidth:'2px',
									},
									longitude: 1,
									latitude: -0.28,
								},
								{
									id: 'new-marker',
									circle:20,
                    				svgStyle : {
										fill:'rgba(255,255,0,0.3)',
										stroke:'yellow',
										strokeWidth:'2px',
									},
									longitude: -0.5,
									latitude: -0.28,
									tooltip:'前台 <b>点击查看详细信息</b>',
									content: document.getElementById('front-desk').innerHTML,
								}
						    ]
					  }],
				  ],
			  });
			const markersPlugin = this.viewer.getPlugin(MarkersPlugin);
				markersPlugin.on('select-marker', (e, marker) => {
					if(marker.id == 'circle'){
					this.viewer.animate({
						longitude: marker.config.longitude,
						latitude: marker.config.latitude,
						zoom: 100,
						speed: '-2rpm',
					}).then(() =>
						this.viewer.setPanorama(
							this.imgurl2
						).then(() =>
						  	markersPlugin.updateMarker({
								id: marker.id,
								tooltip:'去住院部',
								longitude: -1.8,
								latitude: -0.28,
						  	}
							),
						  	this.viewer.animate({
								zoom: 50,
								speed: '2rpm',
						  	}).then(() =>
								this.imgurl2 = this.imgurl3,
								console.log("继续操作")
						  	)
					)  
					)
				}
			  });
		  }
	  }
  </script>