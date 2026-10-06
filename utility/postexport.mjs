import { unlink, rmdir, existsSync } from 'node:fs';

// Remove entrypoints after it was used by sapper export, so it won't end up public
if (existsSync('__sapper__/export/entrypoints/index.html')) {
    unlink('__sapper__/export/entrypoints/index.html', (err) => {
        if (err) throw err;
        console.log('postexport.js: __sapper__/export/entrypoints/index.html was deleted');
    });
} else {
    console.error('postexport.js: __sapper__/export/entrypoints/index.html doesn\'t exist');
}

if (existsSync('__sapper__/export/entrypoints')) {
    rmdir('__sapper__/export/entrypoints', (err) => {
        if (err) throw err;
        console.log('postexport.js: __sapper__/export/entrypoints was deleted');
    });
} else {
    console.error('postexport.js: __sapper__/export/entrypoints doesn\'t exist');
}
