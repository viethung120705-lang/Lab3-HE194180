import React from "react";
import { products } from "../data/products";
import { Link, useSearchParams } from "react-router-dom";

function ProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const sort = searchParams.get("sort") || "none";

    // 1. Lọc theo keyword
    let filterProducts = products.filter((product) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()),
    );

    if (sort === "price-asc") {
        filterProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
        filterProducts.sort((a, b) => b.price - a.price);
    }

    // 2. Logic phân trang
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    const pageSize = 4; // Hoặc số lượng sản phẩm trên 1 trang bạn muốn
    const totalPages = Math.max(1, Math.ceil(filterProducts.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    
    const starIndex = (currentPage - 1) * pageSize;
    const displayProducts = filterProducts.slice(starIndex, starIndex + pageSize);

    // Hàm cập nhật các tham số URL
    function updateParams(changes) {
        const nextParams = new URLSearchParams(searchParams);
        Object.entries(changes).forEach(([key, value]) => {
            if (value === "" || value === "none" || value === null) {
                nextParams.delete(key);
            } else {
                nextParams.set(key, String(value));
            }
        });
        setSearchParams(nextParams);
    }

    function goToPage(newPage) {
        updateParams({ page: newPage });
    }

    function handleKeywordChange(event) {
        updateParams({
            keyword: event.target.value,
            page: 1,
        });
    }

    function handleSortChange(event) {
        updateParams({
            page: 1,
            sort: event.target.value,
        });
    }

    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            <nav>
                <Link to="/">Home Page</Link> {" | "}
                <Link to="/products">List of Product</Link> {" | "}
            </nav>
            {/* tìm kiếm */}
            <div>
                <label>
                    Tìm theo tên:{" "}
                    <input
                        type="text"
                        placeholder="Tìm tên sản phẩm..."
                        value={keyword}
                        onChange={handleKeywordChange}
                    />
                </label>
            </div>
            {/* sort */}
            <div>
                <label>
                    Sắp xếp:{" "}
                    <select value={sort} onChange={handleSortChange}>
                        <option value="none">Mặc định</option>
                        <option value="price-asc">Giá thấp đến cao</option>
                        <option value="price-desc">Giá cao đến thấp</option>
                    </select>
                </label>
            </div>

            <table border={1} style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead>
                    <tr>
                        <th style={{ padding: "8px" }}>ID</th>
                        <th style={{ padding: "8px" }}>Tên sản phẩm</th>
                        <th style={{ padding: "8px" }}>Danh mục</th>
                        <th style={{ padding: "8px" }}>Giá</th>
                        <th style={{ padding: "8px" }}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {displayProducts.map((product) => (
                        <tr key={product.id}>
                            <td style={{ padding: "8px" }}>{product.id}</td>
                            <td style={{ padding: "8px" }}>{product.name}</td>
                            <td style={{ padding: "8px" }}>{product.category}</td>
                            <td style={{ padding: "8px" }}>{product.price}</td>
                            <td style={{ padding: "8px" }}>
                                <Link to={`/products/${product.id}`}>Chi tiết</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                >
                    previous
                </button>{" "}
                {/* tạo các nút trang */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            disabled={currentPage === pageNumber}
                        >
                            {pageNumber}
                        </button>
                    ),
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                >
                    next
                </button>
            </div>
            <p>
                Trang {currentPage}/{totalPages}
            </p>
        </div>
    );
}

export default ProductList;