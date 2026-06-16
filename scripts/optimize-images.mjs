import sharp from 'sharp'
import { readdirSync, mkdirSync, existsSync } from 'fs'
import { join, parse } from 'path'

const SRC = join(import.meta.dirname, '../public/Images')
const DST = join(import.meta.dirname, '../public/Images-optimized')

const FORMATS = [
  { ext: 'webp', options: { quality: 80 } },
  { ext: 'avif', options: { quality: 65 } },
]

async function optimize() {
  if (!existsSync(DST)) mkdirSync(DST, { recursive: true })

  const files = readdirSync(SRC).filter(f => /\.(jpg|jpeg|png)$/i.test(f))

  for (const file of files) {
    const { name } = parse(file)
    const input = join(SRC, file)

    for (const fmt of FORMATS) {
      const output = join(DST, `${name}.${fmt.ext}`)
      if (existsSync(output)) continue

      await sharp(input)
        .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
        [fmt.ext](fmt.options)
        .toFile(output)

      console.log(`✓ ${name}.${fmt.ext}`)
    }
  }

  console.log(`\nDone — optimized ${files.length} images`)
}

optimize().catch(console.error)
