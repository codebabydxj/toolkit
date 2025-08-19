<template>
    <div class="grid">
        <mv-empty mode="NoData" width="200" text="NoData"></mv-empty>
        <mv-empty mode="Error404" width="200" text="Error404"></mv-empty>
        <mv-empty mode="Permit" width="200" text="Permit"></mv-empty>
        <mv-empty mode="Record" width="200" text="Record"></mv-empty>
        <mv-empty mode="Search" width="200" text="Search"></mv-empty>
        <mv-empty mode="Message" width="200" text="Message"></mv-empty>
        <mv-empty mode="Schedule" width="200" text="Schedule"></mv-empty>
        <mv-empty mode="Image" width="200" text="Image"></mv-empty>
        <mv-empty mode="ShoppingCart" width="200" text="ShoppingCart"></mv-empty>
        <mv-empty mode="Collect" width="200" text="Collect"></mv-empty>
    </div>
    <router-view></router-view>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .b-empty {
        flex: 1;
    }
}
</style>