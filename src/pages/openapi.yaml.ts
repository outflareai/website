import spec from '../../spec/openapi.yaml?raw';

// Serves the vendored copy of the API contract at /openapi.yaml.
export function GET() {
	return new Response(spec, { headers: { 'Content-Type': 'application/yaml; charset=utf-8' } });
}
