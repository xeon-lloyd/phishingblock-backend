const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("YourGoogleAIAPIKey");

export default {
	async fetch(request, env) {	
		let bodyTemplate = {
			id: "메세지 고유값",
			content: "메세지 콘텐츠",
			type: "insert|query",
			from: "message|phone",
		}

		if(request.headers.get('auth')!='YourEncryptKey') return new Response('error', { status: 403 })

		let body;
		try{
			body = await request.json()
		}catch(e){
			return new Response('error', { status: 400 })
		}

		const model = genAI.getGenerativeModel({ model: "embedding-001"});

		const result = await model.embedContent(body.content);
  		const embedding = result.embedding;

		switch(body.type){
			case 'insert':
				const inserted = await env.VECTORIZE_INDEX.insert([{
					id: body.from[0] + body.id,
					values: embedding.values,
					namespace: body.from
				}]);
      			return Response.json(inserted);
				break;
			
			case 'query':
				const matches = await env.VECTORIZE_INDEX.query(embedding.values, { topK: 3, returnValues: false, returnMetadata: false, namespace: body.from });
				return Response.json(matches);
				break;

			case 'delete':
				const deleted = await env.VECTORIZE_INDEX.deleteByIds([body.from[0] + body.id]);
				return Response.json(deleted);
				break;
		}
		
		return Response.json(embedding);	
	},
};
