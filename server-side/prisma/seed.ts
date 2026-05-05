import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function sampleUnique<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  const take = Math.min(count, copy.length);

  for (let i = 0; i < take; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy[idx]!);
    copy.splice(idx, 1);
  }

  return out;
}

async function main() {
  const store = await prisma.store.upsert({
    where: { id: 'seed-store' },
    update: {
      title: 'TeaShop',
      description: 'Сидированный магазин',
    },
    create: {
      id: 'seed-store',
      title: 'TeaShop',
      description: 'Сидированный магазин',
    },
  });

  const categoryData = [
    { title: 'Чёрный чай', description: 'Классические чёрные сорта' },
    { title: 'Зелёный чай', description: 'Лёгкие и свежие зелёные сорта' },
    { title: 'Улун', description: 'Полуферментированные сорта' },
    { title: 'Пуэр', description: 'Выдержанные и прессованные сорта' },
    { title: 'Матча', description: 'Порошковый японский чай' },
    { title: 'Травяные сборы', description: 'Без кофеина, мягкий вкус' },
    { title: 'Фруктовые смеси', description: 'Ароматные фруктовые композиции' },
    { title: 'Чай в пакетиках', description: 'Быстро и удобно' },
    { title: 'Подарочные наборы', description: 'Наборы на подарок' },
    { title: 'Аксессуары', description: 'Посуда и аксессуары для заваривания' },
  ];

  const categories = await Promise.all(
    categoryData.map((c) =>
      prisma.category.upsert({
        where: { id: `seed-category-${c.title}` },
        update: {
          title: c.title,
          description: c.description,
          storeId: store.id,
        },
        create: {
          id: `seed-category-${c.title}`,
          title: c.title,
          description: c.description,
          storeId: store.id,
        },
      }),
    ),
  );

  const colorData = [
    { name: 'Красный', value: '#ef4444' },
    { name: 'Оранжевый', value: '#f97316' },
    { name: 'Жёлтый', value: '#eab308' },
    { name: 'Зелёный', value: '#22c55e' },
    { name: 'Синий', value: '#3b82f6' },
    { name: 'Фиолетовый', value: '#a855f7' },
    { name: 'Чёрный', value: '#111827' },
    { name: 'Белый', value: '#f9fafb' },
  ];

  const colors = await Promise.all(
    colorData.map((c) =>
      prisma.color.upsert({
        where: { id: `seed-color-${c.name}` },
        update: {
          name: c.name,
          value: c.value,
          storeId: store.id,
        },
        create: {
          id: `seed-color-${c.name}`,
          name: c.name,
          value: c.value,
          storeId: store.id,
        },
      }),
    ),
  );

  const existingImages = [
    '/uploads/products/1775509829405-photo_2024-06-11_18-40-23.jpg',
    '/uploads/products/1775509829405-photo_2024-07-31_23-12-11.jpg',
    '/uploads/products/1775509829405-photo_2024-10-30_16-57-58 (2).jpg',
    '/uploads/products/1775510062730-photo_2024-10-30_16-58-15.jpg',
    '/uploads/products/1775554845053-IMG1260.jpg',
    '/uploads/products/1775578487174-photo_2023-08-29_20-04-21.jpg',
    '/uploads/products/1775578560413-photo_2023-08-29_20-03-42.jpg',
    '/uploads/products/1777936876213-asus-rog-strix-g15-g512li-76.jpg',
    '/uploads/products/1777967870062-iphone_15_finish_select_202309_6_7inch_blue_AV1_GEO_US.jpg',
    '/uploads/products/1777967601069-sebastian-bednarek-NuAamGgwymw-unsplash.jpg',
  ];

  const adjectives = [
    'Ароматный',
    'Насыщенный',
    'Нежный',
    'Классический',
    'Премиальный',
    'Освежающий',
    'Мягкий',
    'Бодрящий',
    'Согревающий',
    'Яркий',
  ];

  const teaNames = [
    'Ассам',
    'Эрл Грей',
    'Сенча',
    'Жасминовый',
    'Дахунпао',
    'Те Гуань Инь',
    'Шу Пуэр',
    'Шен Пуэр',
    'Матча церемониальная',
    'Мате',
    'Иван-чай',
    'Ройбуш',
  ];

  const packSizes = ['50г', '100г', '150г', '200г', '250г'];

  const productsToCreate = 80;

  for (let i = 1; i <= productsToCreate; i++) {
    const category = pick(categories);
    const color = pick(colors);
    const title = `${pick(adjectives)} ${pick(teaNames)} ${pick(packSizes)}`;

    const images = sampleUnique(existingImages, 3);

    await prisma.product.upsert({
      where: { id: `seed-product-${i}` },
      update: {
        title,
        description: 'Добавлено сидом. Можно редактировать/удалять в админке.',
        price: 199 + (i % 20) * 25,
        images,
        storeId: store.id,
        categoryId: category.id,
        colorId: color.id,
      },
      create: {
        id: `seed-product-${i}`,
        title,
        description: 'Добавлено сидом. Можно редактировать/удалять в админке.',
        price: 199 + (i % 20) * 25,
        images,
        storeId: store.id,
        categoryId: category.id,
        colorId: color.id,
      },
    });
  }

  await prisma.product.updateMany({
    where: { storeId: store.id, images: { isEmpty: true } },
    data: { images: [pick(existingImages)] },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  });
