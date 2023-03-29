<template>
  <div style="margin: 40px">
    <div>
      <el-descriptions title="XXX病例" :column="4" border>
        <el-descriptions-item label="主人">kooriookami</el-descriptions-item>
        <el-descriptions-item label="地址" :span="2">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
        <el-descriptions-item label="电话">18100000000</el-descriptions-item>
        <el-descriptions-item label="宠物名">XX</el-descriptions-item>
        <el-descriptions-item label="种类">XX</el-descriptions-item>
        <el-descriptions-item label="品种">XX</el-descriptions-item>
        <el-descriptions-item label="病种">XX</el-descriptions-item>
        <el-descriptions-item label="年龄">10</el-descriptions-item>
        <el-descriptions-item label="性别">XX</el-descriptions-item>
        <el-descriptions-item label="免疫">XX</el-descriptions-item>
        <el-descriptions-item label="体重">XX</el-descriptions-item>
        <el-descriptions-item label="接诊状态" :span="16">
          <div>16</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="诊疗过程和方法" :span="16">
          <div>16</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="诊断结果" :span="16">
          <div>16</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="治疗方案" :span="16">
          <div>16</div>
          <div>
            <el-image
              style="width: 100px; height: 100px"
              :src="url"
              :fit="fit"></el-image>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style>

</style>
