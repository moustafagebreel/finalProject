<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    // عرض قائمة المنتجات
    public function index()
    {
        $products = Product::all();
        return view('products.index', compact('products'));
    }

    // عرض صفحة إنشاء منتج جديد
    public function create()
    {
        return view('products.create');
    }

    // حفظ المنتج الجديد في قاعدة البيانات
    public function store(Request $request)
    {
        // قم بتنفيذ التحقق من البيانات وحفظ المنتج
    }

    // عرض تفاصيل منتج معين
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return view('products.show', compact('product'));
    }

    // عرض صفحة تحديث منتج معين
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('products.edit', compact('product'));
    }

    // تحديث المنتج في قاعدة البيانات
    public function update(Request $request, $id)
    {
        // قم بتنفيذ التحقق من البيانات وتحديث المنتج
    }

    // حذف منتج معين
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        // قم بحذف المنتج
    }
}
