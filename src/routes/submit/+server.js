import { json } from "@sveltejs/kit";

export async function POST( {request} ) {

    console.log(request);

    let authHeader = request.headers.get('authorization');
    console.log('authHeader:', authHeader);
    
    const package = await request.json();
    return json({ package });
}