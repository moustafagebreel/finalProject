<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use App\Product;
use App\OrderItem;

class OrderController extends Controller
{
    // عرض قائمة الطلبات
    public function index()
    {
        $orders = Order::all();
        return view('orders.index', compact('orders'));
    }

    // إنشاء طلب جديد
    public function create()
    {
        $products = Product::all();
        return view('orders.create', compact('products'));
    }

    // حفظ الطلب الجديد في قاعدة البيانات
    public function store(Request $request)
    {
        // قم بتنفيذ التحقق من البيانات وحفظ الطلب
    }

    // عرض تفاصيل الطلب
    public function show($id)
    {
        $order = Order::findOrFail($id);
        return view('orders.show', compact('order'));
    }
    
    // إضافة منتج إلى الطلب
    public function addToOrder(Request $request)
    {
        // قم بإضافة المنتج إلى الطلب مع تفاصيله (الكمية والسعر)
    }

    // تحديث الطلب
    public function update(Request $request, $id)
    {
        // قم بتنفيذ التحقق من البيانات وتحديث الطلب
    }

    // حذف الطلب
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        // قم بحذف الطلب
    }
}
