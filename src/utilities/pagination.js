const setOffset = (page, pageSize) => (page - 1) * pageSize;

const generatePaginatedFormat = (data, page, totalData, pageSize) => {
  const totalPages = Math.ceil(totalData / pageSize);
  return {
    data: data,
    pagination: {
      page: page,
      pageSize: pageSize,
      totalItems: totalData,
      totalPages: totalPages,
    },
  };
};

module.exports = { setOffset, generatePaginatedFormat };
