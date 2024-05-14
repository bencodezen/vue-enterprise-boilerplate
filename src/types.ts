import type { Ref } from 'vue'

/**
 * It could be a ref, or a plain value
 */
export type MaybeRef<T> = T | Ref<T>

/**
 * It could be a ref, plain value, or getter function
 */
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)
