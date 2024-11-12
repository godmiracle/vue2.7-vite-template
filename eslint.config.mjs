import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['dist', '**/dist/**', 'node_modules', '**/node_modules/**', '!.prettierrc.js', '!**/.prettierrc.js/**', 'components.d.ts', '**/components.d.ts/**', 'auto-imports.d.ts', '**/auto-imports.d.ts/**'],
  rules: {
    'vue/no-unused-refs': 'off',
  },
})
