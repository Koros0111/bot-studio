<script setup lang="ts">
import { Search, SlidersHorizontal } from "lucide-vue-next";
import type { TelegramMethod } from "@/types/schema";

defineProps<{
  methods: TelegramMethod[];
  categories: string[];
  selectedName?: string;
  loading: boolean;
}>();

const search = defineModel<string>("search", { required: true });
const category = defineModel<string>("category", { required: true });
defineEmits<{ select: [method: TelegramMethod] }>();
</script>

<template>
  <aside class="panel self-start overflow-hidden rounded-xl p-4">
    <div class="flex h-11 items-center gap-2 rounded-lg border border-ink-950/10 bg-paper-100 px-3 transition focus-within:border-signal-blue focus-within:ring-4 focus-within:ring-signal-blue/15 dark:border-paper-50/10 dark:bg-ink-850">
      <Search class="h-4 w-4 shrink-0 text-ink-700 dark:text-paper-300" />
      <input v-model="search" class="min-w-0 flex-1 bg-transparent text-sm outline-none" type="search" placeholder="Search methods, params..." />
    </div>

    <div class="mt-3 flex h-11 items-center gap-2 rounded-lg border border-ink-950/10 bg-paper-100 px-3 dark:border-paper-50/10 dark:bg-ink-850">
      <SlidersHorizontal class="h-4 w-4 shrink-0 text-ink-700 dark:text-paper-300" />
      <select v-model="category" class="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" aria-label="Category">
        <option v-for="item in categories" :key="item">{{ item }}</option>
      </select>
    </div>

    <div class="mt-4 grid max-h-[20rem] gap-2 overflow-y-auto pr-1 lg:max-h-[calc(100vh-14.5rem)]">
      <div v-if="loading" class="empty-pane">Loading Telegram schema...</div>
      <button
        v-for="method in methods"
        :key="method.name"
        class="group min-w-0 rounded-lg border p-3 text-left transition hover:-translate-y-0.5"
        :class="
          selectedName === method.name
            ? 'border-signal-blue bg-signal-blue/10 dark:bg-signal-blue/15'
            : 'border-ink-950/10 bg-paper-50 hover:border-signal-blue hover:bg-paper-100 dark:border-paper-50/10 dark:bg-ink-900 dark:hover:bg-ink-850'
        "
        type="button"
        @click="$emit('select', method)"
      >
        <strong class="block truncate text-sm font-black">• {{ method.name }}</strong>
        <span class="mt-1 truncate block text-xs leading-5 text-ink-700 dark:text-paper-300">
          {{ method.description || "No description available." }}
        </span>
      </button>
      <div v-if="!loading && methods.length === 0" class="empty-pane">No methods match this search.</div>
    </div>
  </aside>
</template>
