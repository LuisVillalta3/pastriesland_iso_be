import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export async function generatePagination<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  currentPage: number,
  limit: number,
) {
  const [data, total] = await query
    .skip((currentPage - 1) * limit)
    .take(limit)
    .getManyAndCount();

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const prevPage = hasPrevPage ? currentPage - 1 : null;

  return {
    results: data,
    paginationProps: {
      total,
      page: currentPage,
      limit: +limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
    },
  };
}
