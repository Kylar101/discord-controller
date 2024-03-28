import * as path from 'node:path';

export function importClassesFromDirectories(
  directories: string[],
  formats = ['.js', '.ts'],
): Function[] {
  const loadFileClasses = (exported: any, allLoaded: Function[]) => {
    if (exported instanceof Function) {
      allLoaded.push(exported);
    } else if (Array.isArray(exported)) {
      // biome-ignore lint/complexity/noForEach: its cleaner to have this a one line
      exported.forEach((i: any) => loadFileClasses(i, allLoaded));
    } else if (exported instanceof Object || typeof exported === 'object') {
      // biome-ignore lint/complexity/noForEach: its cleaner for it to be this way
      Object.keys(exported).forEach((key) =>
        loadFileClasses(exported[key], allLoaded),
      );
    }

    return allLoaded;
  };

  const allFiles = directories.reduce((allDirs, dir) => {
    return allDirs.concat(require('glob').sync(path.normalize(dir))); // eslint-disable-line
  }, [] as string[]);

  const dirs = allFiles
    .filter((file) => {
      const dtsExtension = file.substring(file.length - 5, file.length);
      return (
        formats.indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts'
      );
    })
    .map((file) => {
      return require(file); // eslint-disable-line
    });

  return loadFileClasses(dirs, []);
}
