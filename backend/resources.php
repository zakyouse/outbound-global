<?php
// resources.php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/index.php"; // exposes $pdo

// ✅ Allow JSON (Axios)
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);
if (is_array($data)) {
    $_POST = array_merge($_POST, $data);
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === "GET") {
    fetchResources($pdo);
} elseif ($method === "POST") {
    $action = $_POST['action'] ?? null;

    switch ($action) {
        case "create":
            createResource($pdo);
            break;

        case "edit":
            editResource($pdo);
            break;

        case "publish":
            togglePublish($pdo);
            break;

        case "delete":
            deleteResource($pdo);
            break;

        default:
            http_response_code(400);
            echo json_encode(["message" => "Invalid action"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}

/**
 * FETCH RESOURCES
 * ?all=true → admin
 */
function fetchResources($pdo)
{
    

    
        $stmt = $pdo->query("
            SELECT *
            FROM resources
            ORDER BY created_at DESC
        ");
   

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
}

/**
 * CREATE RESOURCE
 */
function createResource($pdo)
{
    if (
        empty($_POST['title']) ||
        empty($_POST['excerpt']) ||
        empty($_POST['content']) ||
        empty($_POST['category'])
    ) {
        http_response_code(400);
        echo json_encode(["message" => "Missing required fields"]);
        return;
    }

    // Generate slug
    $slug = $_POST['slug'] ?? slugify($_POST['title']);

    /* ================= IMAGE UPLOAD ================= */
    $imagePath = null;

    if (!empty($_FILES['image']['name'])) {
        $uploadDir = __DIR__ . "/pictures/";

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $fileName = uniqid("resource_", true) . "." . $extension;
        $targetPath = $uploadDir . $fileName;

        if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetPath)) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to upload image"]);
            return;
        }

        // Path saved in DB (used by frontend)
        $imagePath = "pictures/" . $fileName;
    }

    /* ================= INSERT ================= */
    $stmt = $pdo->prepare("
        INSERT INTO resources
        (slug, title, excerpt, content, image, category, created_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW())
    ");

    $stmt->execute([
        $slug,
        $_POST['title'],
        $_POST['excerpt'],
        $_POST['content'],
        $imagePath,
        $_POST['category']
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Resource created successfully"
    ]);
}


/**
 * EDIT RESOURCE
 */
function editResource($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Resource ID required"]);
        return;
    }

    $stmt = $pdo->prepare("
        UPDATE resources
        SET title = ?, excerpt = ?, content = ?, image = ?, category = ?, updated_at = NOW()
        WHERE id = ?
    ");

    $stmt->execute([
        $_POST['title'],
        $_POST['excerpt'],
        $_POST['content'],
        $_POST['image'] ?? null,
        $_POST['category'],
        $_POST['id']
    ]);

    echo json_encode(["message" => "Resource updated"]);
}

/**
 * TOGGLE PUBLISH
 */
function togglePublish($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Resource ID required"]);
        return;
    }

    $stmt = $pdo->prepare("
        UPDATE resources
        SET is_published = NOT is_published
        WHERE id = ?
    ");

    $stmt->execute([$_POST['id']]);

    echo json_encode(["message" => "Publish status updated"]);
}

/**
 * DELETE RESOURCE
 */
function deleteResource($pdo)
{
    if (empty($_POST['id'])) {
        http_response_code(400);
        echo json_encode(["message" => "Resource ID required"]);
        return;
    }

    $stmt = $pdo->prepare("DELETE FROM resources WHERE id = ?");
    $stmt->execute([$_POST['id']]);

    echo json_encode(["message" => "Resource deleted"]);
}

/**
 * SLUG HELPER
 */
function slugify($text)
{
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-');
}
