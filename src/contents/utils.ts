import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
}
function parseFrontmatter(fileContent: string): { metadata: Metadata; content: string } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  if (!match) throw new Error("No front matter found");


  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, '').trim();

  const metadata: Partial<Metadata> = {};

  frontMatterBlock.trim().split('\n').forEach(line => {
    const [key,...valueArr] = line.split(': ');
    const value = valueArr.join(': ').trim();
    const unquotedValue = value.replace(/^['"](.*)['"]$/, '$1'); 
    metadata[key.trim() as keyof Metadata] = unquotedValue;
  });

  return { metadata: metadata as Metadata, content };
}


function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = parseFrontmatter(fs.readFileSync(path.join(dir, file), 'utf-8'))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'src', 'contents')).map(({ content, metadata, slug }) => ({ content, slug, metadata: { ...metadata, publishedAt: formatDate(metadata.publishedAt) } }))
}

function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}