import prismadb from "@/lib/prismadb";

interface Product {
    price: {
        toNumber(): number;
    };
}

interface OrderItem {
    product: Product;
}

interface Order {
    orderItems: OrderItem[];
}

export const getTotalRevenue = async (storeId: string): Promise<number> => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId,
            isPaid: true,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const totalRevenue = paidOrders.reduce((total: number, order: Order) => {
        const orderTotal = order.orderItems.reduce((orderSum, item) => {
            return orderSum + item.product.price.toNumber();
        }, 0);

        return total + orderTotal;
    }, 0);

    return totalRevenue;
}
