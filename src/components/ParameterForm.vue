<script setup lang="ts">
import ParameterInput from '@/components/ParameterInput.vue';
import type { ParamValue, TelegramMethod, TelegramSchema } from '@/types/schema';

defineProps<{ method: TelegramMethod | null; schema: TelegramSchema | null }>();
const values = defineModel<Record<string, ParamValue>>({ required: true });
</script>

<template>
  <div v-if="!method" class="empty-pane">
    Choose a Telegram Bot API method from the list to generate its parameter form.
  </div>
  <div v-else-if="method.parameters.length === 0" class="empty-pane">
    This method has no parameters. Add a token and run it.
  </div>
  <!-- CSS multi-column masonry instead of a row-grid: a row-grid forces every card in a row to
  the same height as its tallest neighbor, leaving dead space under shorter ones. Columns pack each
  card directly under the shortest column instead, like tiles. Trade-off: visual fill order becomes
  column-major (top-to-bottom, then next column) while DOM/tab order stays the original sequential
  order — normal for this technique. -->
  <div v-else class="columns-1 lg:columns-2 lg:gap-4">
    <ParameterInput
      v-for="parameter in method.parameters"
      :key="parameter.name"
      v-model="values[parameter.name]"
      class="mb-4 break-inside-avoid-column"
      :parameter="parameter"
      :schema="schema"
    />
  </div>
</template>
