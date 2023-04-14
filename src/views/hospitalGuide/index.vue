<template>
  <div id="viewer" />
</template>
<script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/plugins/markers.css'
import axios from 'axios'
import { get } from 'js-cookie'
	  export default {
		  data() {
			  return {
				  viewer: '',
				  markersPlugin: '',
				  imgurl1: require('./dating.jpeg'),
				  imgurl2: require('./shoushu.jpeg'),
				  imgurl3: require('./zhuyuan.jpeg')
			  }
		  },
		  mounted() {
			  this.viewer = new Viewer({
				  container: document.querySelector('#viewer'),
				  panorama: this.imgurl1,
				  size: {
					  width: '95vw',
					  height: '95vh'
				  },
				  plugins: [
					  [MarkersPlugin, {
						  	markers: [
							  {
                  id: '去手术',
                  tooltip: '去手术室',
                  circle: 20,
                  svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
              longitude: 1,
              latitude: -0.28
            },
            {
              id: '去住院',
              tooltip: '去住院室',
              circle: 20,
              svgStyle: {
              fill: 'rgba(255,255,0,0.3)',
              stroke: 'yellow',
              strokeWidth: '2px'
            },
              longitude: 1,
              latitude: 0.28
            },
            {
              id: 'new-marker',
              circle: 20,
                svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28,
              tooltip: '前台 <b>点击查看详细信息</b>',
              content: '前台信息读取'
            }
						    ]
					  }]
				  ]
			  })
    const markersPlugin = this.viewer.getPlugin(MarkersPlugin)
    // any=》手术
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id == '去手术') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl2
          ).then(() =>
						  	markersPlugin.setMarkers([{
              id: '去住院',
              tooltip: '去住院室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -1.8,
              latitude: -0.28
            },
            {
              id: '去大厅',
              tooltip: '去大厅',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -1.8,
              latitude: -0
            },
            {
              id: 'new-marker',
              circle: 20,
                    				svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.25,
              latitude: -0.28,
              tooltip: '手术台 <b>点击查看详细信息</b>',
              content: '手术台信息读取'
            }]),
						  	this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
						  	}).then(() =>
            console.log('继续操作')
						  	)
          )
        )
      }
    })
    // any-》住院
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id == '去住院') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl3
          ).then(() =>
						  	markersPlugin.setMarkers([{
              id: '去大厅',
              tooltip: '去大厅',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -1,
              latitude: -0.28
            },{
              id: '去手术',
              tooltip: '去手术室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -1.8,
              latitude: -0.28
            },
            {
              id: 'new-marker',
              circle: 20,
                svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.25,
              latitude: -0.28,
              tooltip: '住院箱 <b>点击查看详细信息</b>',
              content: '住院箱信息读取'
            }]),
						  	this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
						  	}).then(() =>
            console.log('继续操作')
						  	)
          )
        )
      }
    })
    // any->大厅
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id == '去大厅') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl1
          ).then(() =>
						  	markersPlugin.setMarkers([{
              id: '去手术',
              tooltip: '去手术室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: -0.28
            },{
              id: '去住院',
              tooltip: '去住院部',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: 0.28
            },
            {
              id: 'new-marker',
              circle: 20,
                    				svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28,
              tooltip: '前台 <b>点击查看详细信息</b>',
              content: '前台信息读取'
            }
            ]),
						  	this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
						  	}).then(() =>
            console.log('继续操作')
						  	)
          )
        )
      }
    })
    //住院转手术
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id == '住院') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl1
          ).then(() =>
						  	markersPlugin.setMarkers([{
              id: '大厅',
              tooltip: '去手术室',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 1,
              latitude: -0.28
            },
            {
              id: 'new-marker',
              circle: 20,
                svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28,
              tooltip: '前台 <b>点击查看详细信息</b>',
              content: '前台信息读取'
            }
            ]),
						  	this.viewer.animate({
            zoom: 50,
            speed: '2rpm'
						  	}).then(() =>
            console.log('继续操作')
						  	)
          )
        )
      }
    })
		}
	  }
</script>
