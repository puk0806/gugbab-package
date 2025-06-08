export function classnames(...args: Array<string | Record<string, boolean>>) {
  const classes: string[] = [];

  for (const classname of args) {
    if (typeof classname === 'string') {
      classes.push(classname);
    } else {
      Object.keys(classname).forEach(name => {
        if (classname[name]) {
          classes.push(name);
        }
      });
    }
  }

  return classes.join(' ');
}
