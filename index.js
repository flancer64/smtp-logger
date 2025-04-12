#!/usr/bin/env node
'use strict';
import Container from '@teqfw/di';

// Create a new container and map namespace roots to module source paths for resolving dependencies.
const container = new Container();
const resolver = container.getResolver();
resolver.addNamespaceRoot('Smtp_Log_', import.meta.resolve('./src'));
/** @type {Smtp_Log_App} */
const app = await container.get('Smtp_Log_App$');
app.run().catch(console.error);