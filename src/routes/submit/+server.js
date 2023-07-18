import { db } from '$lib/fbconfig.js';
import { addDoc, collection } from 'firebase/firestore';
import { allKeys, initKeys } from '$lib/stores/keys.js';
import { initPackages } from '$lib/stores/packages.js';

export async function POST( {request} ) {
    await initKeys();

    let valid = false;

    const bearer = request.headers.get('authorization');

    allKeys.subscribe( keys => {
        keys.forEach(key => {
            if( bearer.includes( key.key ) ){
                valid = true;
            } 
        })
    });

    if(valid){
        const pack = await request.json();
        
        const col = collection(db, 'packages');

        await addDoc( col, {
            accepted: '',
            ...pack
        });

        await initPackages();
        
        return new Response(201);
    } else {
        return new Response(401);
    }
}