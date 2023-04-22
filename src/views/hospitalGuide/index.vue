<template>
  <div id="viewer" />
</template>
<script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/plugins/markers.css'
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
        width: '90vw',
        height: '90vh'
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
              id: '前台角色',
              tooltip: '前台角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28
            },
            {
              id: '前台信息',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28,
              tooltip: '前台 <b>点击查看详细信息</b>',
              content: '前台的主要操作有进行挂号、收取费用、管理病历等工作<p>进入前台角色扮演以查看更多</p>'
            }
          ]
        }]
      ]
    })
    const markersPlugin = this.viewer.getPlugin(MarkersPlugin)
    // any=》手术
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '去手术') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl2
          ).then(() =>
            markersPlugin.setMarkers([
              {
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
                id: '医生扮演',
                tooltip: '医生扮演',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: 0.4,
                latitude: -0.7
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
    //  医生扮演
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '医生扮演') {
        this.viewer.animate({
          longitude: marker.config.longitude,
          latitude: marker.config.latitude,
          zoom: 100,
          speed: '-2rpm'
        }).then(() =>
          this.viewer.setPanorama(
            this.imgurl2
          ).then(() =>
            markersPlugin.setMarkers([
              {
                id: '去手术',
                tooltip: '退出角色扮演',
                circle: 20,
                svgStyle: {
                  fill: 'rgba(255,255,0,0.3)',
                  stroke: 'yellow',
                  strokeWidth: '2px'
                },
                longitude: -0.25,
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
                longitude: 0.4,
                latitude: -0.7,
                tooltip: '做手术',
                content: '<h1>手术台操作指南<h1><p></p>'
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
    //  前台角色扮演
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '前台角色') {
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
              id: '去大厅',
              tooltip: '退出角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
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
              longitude: 0,
              latitude: -0.28,
              tooltip: '前台操作',
              content: '<html><head> <meta content="text/html;charset=UTF-8"></head><body><video width="500" height="500" controls autoplay><source src="/Users/zhanpengfei/petFE/src/views/hospitalGuide/video/qiantai.mp4" type="video/mp4"><source src="/Users/zhanpengfei/petFE/src/views/hospitalGuide/video/qiantai.webm" type="video/webm"><object data="/Users/zhanpengfei/petFE/src/views/hospitalGuide/video/qiantai.mp4" width="320" height="240"><embed width="500" height="500" src="/Users/zhanpengfei/petFE/src/views/hospitalGuide/video/qiantai.swff"></object></video></body></html>'
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
    //  any-》住院
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '去住院') {
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
            },
            {
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
            },
            {
              id: '医助扮演',
              tooltip: '扮演医助',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.1,
              latitude: -0.28
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
    //  医助扮演
    markersPlugin.on('select-marker', (e, marker) => {
      if (marker.id === '医助扮演') {
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
              id: '去住院',
              tooltip: '退出角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: -0.5,
              latitude: -0.28
            },
            {
              id: '去住院',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28,
              tooltip: '医助住院操作',
              content: '<h1>住院操作指南<h1><blockquote><p>按照医生的诊断进行打针与膳食管理。</p></blockquote>'
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
      if (marker.id === '去大厅') {
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
            },
            {
              id: '前台角色',
              tooltip: '前台角色扮演',
              circle: 20,
              svgStyle: {
                fill: 'rgba(255,255,0,0.3)',
                stroke: 'yellow',
                strokeWidth: '2px'
              },
              longitude: 0,
              latitude: -0.28
            },
            {
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
  }
}
</script>
