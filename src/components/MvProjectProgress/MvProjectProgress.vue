<template>
    <div class="mv-project-progress" v-loading="loading" ref="progressRef">
        <div class="mv-project-progress-title" v-for="(item, index) in stepList" :key="index">
            <div class="mv-project-progress-top">
                <span v-if="item.iconState === 1" class="big" :style="{
                    color: current >= item.step ? colorOption.currentNameColor : '',
                    fontWeight: current >= item.step ? 'bold' : 'normal'
                }">{{ item.name }}</span>
                <span v-if="item.iconState === 0" class="small">{{ item.createDate }}</span>
            </div>
            <div class="mv-project-progress-icon" @click.stop="clickStep(item)" :style="{
                '--mv-progress-icon-line': colorOption.lineColor,
                '--mv-progress-lineType': current >= item.step ? 'solid' : 'dashed',
                '--mv-progress-right-lineType': current > item.step ? 'solid' : 'dashed'
            }">
                <template v-if="item.iconState === 1">
                    <img :src="icon.finish" alt="" v-if="current > item.step">
                    <img :src="icon.current" alt="" v-else-if="current === item.step">
                    <img :src="icon.default" alt="" v-else>
                </template>
                <span :style="{
                    '--mv-progress-icon-color': current > item.step ? colorOption.finishDotColor : current === item.step ? colorOption.currentDotColor : colorOption.dotColor
                }" class="icon-small" v-if="item.iconState === 0"></span>
            </div>
            <div class="mv-project-progress-bottom">
                <div class="name" v-if="item.iconState === 0" :style="{
                    color: current > item.step ? colorOption.currentNameColor : current === item.step ? colorOption.currentDotColor : '',
                    fontWeight: current > item.step ? 'bold' : 'normal',
                    '--mv-progress-icon-color': current > item.step ? colorOption.finishDotColor : current === item.step ? colorOption.currentDotColor : colorOption.dotColor
                }">{{ item.name }}</div>
            </div>
            <div class="mv-project-progress-custom-bottom">
                <slot v-bind="item"></slot>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { client } from '../../api'
import { mvProjectProgressEmits, mvProjectProgressProps } from './mvProjectProgress';

defineOptions({
    name: "MvProjectProgress"
})

const props = defineProps(mvProjectProgressProps)
const emit = defineEmits(mvProjectProgressEmits)

const colorOption = computed(() => {
    return Object.assign({
        dotColor: '#909399',
        currentDotColor: '#67c23a',
        finishDotColor: '#79bbff',
        lineColor: '#79bbff',
        currentNameColor: '#79bbff',
    }, props.colorOption)
})
const progressRef = ref()
const stepList = ref<Record<string, any>[]>([])

const loading = ref(false)
// 获取从县级上报开始对应项目进度的所有节点
const getStepList = async () => {
    try {
        loading.value = true
        const res = await client.post(props.apiUrl, {
            businessId: props.businessId, tableName: props.tableName
        })
        stepList.value = res.data
        loading.value = false
    } catch (e) {
        loading.value = false
    }
}

const clickStep = (data: any) => {
    emit('dotClick', data)
}

onMounted(() => {
    getStepList()

    progressRef.value.addEventListener('wheel', (event: any) => {
        event.preventDefault()
        progressRef.value.scrollLeft += (event.deltaY as number)
    })
})

const icon = ref({
    current: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAFmSURBVEhL1ZaxagJBEIb3EVKmsLAIBKxSiJIm+EhWViEmnWBjmS6NjUGLewIbkaCFTyB5BF/AuNlfd+CcG+/mvF1Ifvg5dnbZz9lbf878C93NvmrNYfLeGiTr9tv0GWM/FUeN8eLh8eVz99QbWzLGqPslYSUBo4Il4P1kGQ8sAW9XW2v29vhM14OA84DkoGANMCi4DJBcCawB1p03B2tvUjX4KrC2ww8HhObuyedKgbXA7s8JSMKYr1GBEWUaII5152EkjFHnayXwWWQiQ9MLJCD8feJkJB0zzMHIbI80BuFNE0gaaYM+O1au1wvgdHKB45HG4BfQBCx1ik1H/gJxoY75otuME/XIEu/UdYsj5kadr+XAzDuFNLcXnaAj7kr/1yKwptNSQFIeuKjTq4CkS2Bs3nFdcVcGkvI65g4CJGnAQYGkPHAUIEkCR/1GIkngqECSBI4KJCHKkKEIb2R2Jtr+poz5Bdxk1FYmPj3hAAAAAElFTkSuQmCC',
    default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABHNCSVQICAgIfAhkiAAAAadJREFUSEvF1jFPg0AUAOB3Al1c2qGDiaY2UQcZZNDFxIi/wF9AjP+gDnXWtS7+gzrU3X8g2q066KBTE9rErYuzKOeBHkKB4x6Q2Im0x315r/feOwL/8CFY0+z06181tU+AGJSCrbjuiX15/I7ZB4Xudq8NFbxbIKQeIhSeFlz3AANLo6kgl5GwFDoPapoC6xtL8Pry9pdVBJyLpoH7pg6NxiI4zgweH8ZoWIiKQC4VgTNRGbAonIpiwCJwAi0CYuEYWgbEwCFaBSgLB6jf2jxNdXin8euQlwWmvUXXik51gO51BzeEwKH/XAWYGTHQ8/uedcbRCUNb/uJNfRl0faVogIn3RqMxTCez4HtK6d3wwjJ/0NPBFXs44m9s76xBu90sDSdSHI30d1zZbFxtVQXPgxTo87BnGf7+4emtEk4DlY9Pk4+/WJ1WAeeBsUh5WsvAMmAqyuuWXUlQ/7EsmIliYQwoRGVhLJiL5sFFQCk0C26tNsNOE3QbVofRshB1ltw7kuhU898woHSkIhgLolGeaq+mdtjt3mRDwvanBrZJS6cXu7Fo/TfbfYMtbYYbAwAAAABJRU5ErkJggg==',
    finish: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABHNCSVQICAgIfAhkiAAAAmRJREFUSEvF1k1PE0EYB/Bn6XYTMbw0UAiEF0lQXnqgB+VA0rh+AuPNS2P4BnjAM17x4jfAAybe8OSJxGpv1YMcQCXVokEMKQZCo+AWOsxTnXXfZvaZXpzTZndnfvk/szOzBvyHZuia9sJK97llrhhgZBmDQqJev194PH+kM44WOrf4NGtC4yUYRreLMHjXVq/f0oHJaCQoZE2YhAbBZDIBV68NwNbm7r+qasCxaBR4085AKnUZKpUqvH1T1oaVqAoUUiuwFKWArcKRKAW0Em3gnDfc0uokDqEUsMMy4c7EIDzb2m0J9qEUEKPdnR6C3ksWfD76CS8+7fv2BUpiF6WCs4MpmB1IudD6ThU+/KhpwU0Ut7ZG0qyInQbXoVgW3tEwHab0tt98XrHMNeeMDDfR3OLqc8OA23gtA/HDQbCTz2ewfaudwtr2Xuh+qNTAHr5ezi8JdIejo9hrOjMEmcxwaIDccA/M9HVJ9/XS90Mo7R2GnpdKZfjCpwAbY+xV8VHe/oM+WH3CL+6JHtdvjMPYWNodAFNm+7uaKSd7OkID45we8/IGUWXSv8dVgR9XMzIY7+Oc5kZ6Q2jx6wEcnDjKOWXANorL+Sy+5H69FBjX51RE0vc8qfdDCiZEMOGc2eL4863TOJiSNA70JRW1UcFxSSlgJIo3ZfDEeD+k263QnFZ/OfCxvO875oIl9XaSnjJxpfYOQk0o+ijPUwqsC0rL602hglsBSahsjkevpN2dprnbBJaFdOvyrlPVSzJY9NEByUlVy0kX1EZF4oZlLvC/e5sfEgU8NeKqFHwe+wuqOyDl/Qs9LdEtcEN1SQAAAABJRU5ErkJggg=='
})

</script>
  
<style scoped lang="scss">
.mv-project-progress {
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    padding-bottom: 10px;
    user-select: none;

    &::-webkit-scrollbar {
        height: 5px;
        border-radius: 5px;
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: transparent;
    }

    &:hover {
        &::-webkit-scrollbar {
            background-color: var(--el-color-info-light-7);
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--el-color-info-light-3);
        }
    }

    &-custom-bottom {
        padding: 0 10px;
    }

    &-bottom {
        font-size: 14px;

        .name {
            line-height: 1.6;
            height: 28px;

            &:after {
                content: "";
                height: 3px;
                width: 28px;
                background-color: var(--mv-progress-icon-color);
                display: block;
                border-radius: 5px;
                opacity: 0.5;
            }
        }
    }

    &-top {
        height: 24px;
        font-size: 14px;

        .big {
            font-size: 16px;
        }

        .small {
            font-size: 14px;
            margin-top: 5px;
            display: block;
        }
    }

    &-icon {
        width: 100%;
        display: flex;
        align-items: center;
        height: 30px;
        cursor: pointer;

        &:before,
        &:after {
            content: "";
            border-top-width: 2px;
            border-top-color: var(--mv-progress-icon-line);
            border-top-style: var(--mv-progress-lineType);
            display: inline-block;
            flex: 1;
            min-width: 60px;
        }

        &:after {
            border-top-style: var(--mv-progress-right-lineType);
        }

        img {
            width: 32px;
        }

        .icon-small {
            background: var(--mv-progress-icon-color);
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: block;
            transition: transform .5s linear inherit;

            &:after {
                content: "";
                width: 10px;
                height: 10px;
                border-radius: 50px;
                display: block;
                transform: scale(1.6);
                background: var(--mv-progress-icon-color);
                opacity: 0.3;
            }
        }
    }

    &-title {
        display: flex;
        flex-direction: column;
        align-items: center;

        &:first-child {
            .mv-project-progress-icon:before {
                opacity: 0
            }
        }

        &:last-child {
            .mv-project-progress-icon:after {
                opacity: 0;
            }
        }

        &:hover {

            .mv-project-progress-icon .icon-small {
                transform: scale(1.5);

                &:after {
                    animation: mvProjectProgressIconZoom .3s linear infinite;
                }
            }
        }
    }
}

@keyframes mvProjectProgressIconZoom {
    from {
        transform: scale(1);
        opacity: 0.6;
    }

    to {
        transform: scale(3);
        opacity: 0;
    }
}
</style>