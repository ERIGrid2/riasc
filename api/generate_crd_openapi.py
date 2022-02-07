#!/bin/env python3

import glob
import yaml

def load_crds(dir: str = './crds'):
    yaml_docs = []

    for yaml_file in glob.glob(f'{dir}/*.yaml'):
        if yaml_file.startswith(f'{dir}/_'):
            continue

        with open(yaml_file) as f:
            for yaml_doc in yaml.load_all(f, yaml.UnsafeLoader):
                yaml_docs.append(yaml_doc)

    return yaml_docs

if __name__ == '__main__':
    dir = './crds'

    with open(f'{dir}/_template.yaml') as f:
        tpl = yaml.load(f, yaml.UnsafeLoader)

    with open(f'{dir}/_objectmeta.yaml') as f:
        tpl_objectmeta = yaml.load(f, yaml.UnsafeLoader)

    tags = tpl['tags']
    tag_groups = tpl['x-tagGroups']

    schemas = {}
    for crd in load_crds(dir):
        kind = crd['spec']['names']['kind']
        group = crd['spec']['group']

        for version in crd['spec']['versions']:
            schema = version['schema']['openAPIV3Schema']
            version_name = version['name']
            schema_name = f'{version_name.upper()}{kind}'
            tag_name = f'crd-{version_name}-{kind.lower()}'

            schema['properties']['metadata'] = tpl_objectmeta
            schema['properties']['kind'] = {
                'type': 'string',
                'enum': [kind],
                'description': 'Kind is a string value representing the REST resource this object represents.'
            }
            schema['properties']['apiVersion'] = {
                'type': 'string',
                'enum': [f'{group}/{version_name}'],
                'description': 'APIVersion defines the versioned schema of this representation of an object.'
            }
            
            schemas[schema_name] = schema

            desc = schema.get('description', '')
            desc += f'<SchemaDefinition schemaRef="#/components/schemas/{schema_name}" />'

            tags.append({
                'name': tag_name,
                'x-displayName': f'{kind}s {version_name} {group}',
                'description': desc
            })

            tag_groups[0]['tags'].append(tag_name)

    tpl['components']['schemas'] = schemas

    with open('crds.yaml', 'w+') as f:
        yaml.dump(tpl, f)
