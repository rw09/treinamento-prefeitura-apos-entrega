<template>
    <Head title="Departamentos - Edição" />

    <section class="container mt-8 mx-auto px-80">
        <form @submit.prevent="submit" class="mx-20 pt-4 px-10 pb-12 rounded shadow-md bg-gray-100">
            <h1 class="text-center mt-2 mb-8 underline underline-offset-4 decoration-slate-400 text-slate-800">Editar Departamento</h1>
            <div>
                <label for="nome" class="block text-xs">Nome:</label>
                <input v-model="form.nome" type="text" name="nome" id="nome" class="px-3 mt-1 py-1 w-full border rounded" maxlength="101" required @change="form.validate('nome')">
                <div v-if="form.errors.nome" v-text="form.errors.nome" class="text-red-400 text-xs mt-1"></div>
            </div>
            <div class="flex justify-end gap-4 pt-4">
                <Link onclick="history.back()" class="mt-8 px-4 py-2 rounded font-medium bg-rose-600/80 text-white hover:bg-red-400">Cancelar</Link>
                <button type="submit" class="mt-8 px-4 py-2 rounded font-medium bg-teal-500 text-white hover:bg-teal-400" :disabled="form.processing">Salvar Alterações</button>
            </div>
        </form>
    </section>
</template>

<script setup>
import { useForm } from 'laravel-precognition-vue-inertia';

    const props = defineProps({
        departamento: Object
    });

    const form = useForm('put', route('departamentos-update', props.departamento.id), {
        id: props.departamento.id,
        nome: props.departamento.nome,
    });

    const submit = () => form.submit();
</script>