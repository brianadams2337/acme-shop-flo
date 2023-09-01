export default function extend(app: any, mixin: any) {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push(mixin)
}
