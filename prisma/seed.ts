import { PrismaClient } from '@prisma/client';
import { ARTWORKS_DATA } from '../src/lib/art-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Artora Artworks into database...');
  for (const art of ARTWORKS_DATA) {
    await prisma.artPiece.upsert({
      where: { slug: art.slug },
      update: {},
      create: {
        id: art.id,
        slug: art.slug,
        title: art.title,
        titleBn: art.titleBn,
        medium: art.medium,
        mediumBn: art.mediumBn,
        canvasSize: art.canvasSize,
        canvasSizeBn: art.canvasSizeBn,
        priceBDT: art.priceBDT,
        priceUSD: art.priceUSD,
        isSold: art.isSold,
        isCommissionable: art.isCommissionable,
        featured: art.featured,
        images: JSON.stringify(art.images),
        primaryImage: art.primaryImage,
        description: art.description,
        descriptionBn: art.descriptionBn,
        year: art.year,
        category: art.category,
      },
    });
  }
  console.log('Seeding complete! ✨');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
