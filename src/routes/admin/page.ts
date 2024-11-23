import { error } from '@sveltejs/kit';
export async function load(){
    if (process.env.NODE_ENV !== 'development'){
        throw error(404, "Not Found" );
    }
}