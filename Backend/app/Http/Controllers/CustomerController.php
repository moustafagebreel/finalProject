<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class CustomerController extends Controller
{
    // عرض قائمة العملاء
    public function index()
    {
        $customers = Customer::all();
        return view('customers.index', compact('customers'));
    }

    // عرض صفحة إنشاء عميل جديد
    public function create()
    {
        return view('customers.create');
    }

    // حفظ عميل جديد في قاعدة البيانات
    public function store(Request $request)
    {
        // قم بتنفيذ التحقق من البيانات وحفظ العميل
    }

    // عرض تفاصيل عميل معين
    public function show($id)
    {
        $customer = Customer::findOrFail($id);
        return view('customers.show', compact('customer'));
    }

    // عرض صفحة تحديث بيانات عميل معين
    public function edit($id)
    {
        $customer = Customer::findOrFail($id);
        return view('customers.edit', compact('customer'));
    }

    // تحديث بيانات العميل في قاعدة البيانات
    public function update(Request $request, $id)
    {
        // قم بتنفيذ التحقق من البيانات وتحديث العميل
    }

    // حذف عميل معين
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        // قم بحذف العميل
    }
}
