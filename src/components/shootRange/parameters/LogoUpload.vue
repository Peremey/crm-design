<script setup lang="ts">
import ImgUpload from '~/components/shootRange/parameters/ImgUpload.vue';

interface IProps {
    label?: string
}
withDefaults(defineProps<IProps>(), {
    label: 'Логотип'
})
</script>

<template>
    <ImgUpload :label="label">
        <div class="logo-preview">
        </div>
    </ImgUpload>
</template>

<style scoped lang="scss">
.logo-preview {
    border-radius: 50%;
    width: r(84);
    height: r(84);
    background-color: $l-gray;
}
</style>