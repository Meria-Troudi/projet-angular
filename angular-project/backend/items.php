<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($method) {
    // GET all or GET by ID
    case 'GET':
        if ($id) {
            $stmt = $pdo->prepare("SELECT * FROM items WHERE id = ?");
            $stmt->execute([$id]);
            $item = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($item) {
                echo json_encode($item);
            } else {
                http_response_code(404);
                echo json_encode(["error" => "Item not found"]);
            }
        } else {
            $stmt = $pdo->query("SELECT * FROM items ORDER BY created_at DESC");
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        break;

    // POST - Add new item
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['name'])) {
            http_response_code(400);
            echo json_encode(["error" => "Name is required"]);
            break;
        }
        $stmt = $pdo->prepare("INSERT INTO items (name, description, price) VALUES (?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            $data['price'] ?? 0
        ]);
        $newId = $pdo->lastInsertId();
        $stmt = $pdo->prepare("SELECT * FROM items WHERE id = ?");
        $stmt->execute([$newId]);
        http_response_code(201);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        break;

    // PUT - Update item
    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID is required"]);
            break;
        }
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $pdo->prepare("UPDATE items SET name=?, description=?, price=? WHERE id=?");
        $stmt->execute([
            $data['name'],
            $data['description'] ?? '',
            $data['price'] ?? 0,
            $id
        ]);
        if ($stmt->rowCount() > 0) {
            $stmt = $pdo->prepare("SELECT * FROM items WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Item not found or no changes"]);
        }
        break;

    // DELETE - Remove item
    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID is required"]);
            break;
        }
        $stmt = $pdo->prepare("DELETE FROM items WHERE id = ?");
        $stmt->execute([$id]);
        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Item deleted successfully"]);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Item not found"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
}
?>
