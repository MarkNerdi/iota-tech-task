import {ConfirmDialog} from '@/types';
import {Writable, writable} from "svelte/store";

export const confirmDialog: Writable<ConfirmDialog> = writable({
    title: null,
    content: null,
    action: null,
    isActive: null
});
export const infoDialog = writable({});
export const toast = writable({});

export function openConfirmDialog(payload) {
    confirmDialog.set({
        title: payload.title,
        content: payload.content || "",
        action: payload.action,
        isActive: true
    });
}

export function closeConfirmDialog() {
    confirmDialog.set({
        title: null,
        content: null,
        action: null,
        isActive: null
    });
}

export function showSuccessToast(text) {
    toast.set({mode: "ok", text: text});
}

export function showInfoToast(text) {
    toast.set({mode: "info", text: text});
}

export function showErrorToast(text) {
    toast.set({mode: "error", text: text});
}

export function hideToast() {
    toast.set({mode: "", text: ""});
}
